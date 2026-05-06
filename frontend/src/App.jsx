// import { useEffect, useRef, useState } from "react";
// import { connectWS } from "./ws";
// import Chat from "./components/Chat";
// import NamePopup from "./components/NamePopup";

// export default function App() {
//   const socket = useRef(null);
//   const timer = useRef(null);

//   const [userName, setUserName] = useState("");
//   const [showNamePopup, setShowNamePopup] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [typers, setTypers] = useState([]);

//   useEffect(() => {
//     socket.current = connectWS();

//     socket.current.on("chatMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     socket.current.on("typing", (name) => {
//       setTypers((prev) => (prev.includes(name) ? prev : [...prev, name]));
//     });

//     socket.current.on("stopTyping", (name) => {
//       setTypers((prev) => prev.filter((t) => t !== name));
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       {showNamePopup && (
//         <NamePopup
//           setUserName={setUserName}
//           setShowNamePopup={setShowNamePopup}
//           socket={socket}
//         />
//       )}

//       {!showNamePopup && (
//         <Chat
//           socket={socket}
//           userName={userName}
//           messages={messages}
//           setMessages={setMessages}
//           typers={typers}
//         />
//       )}
//     </>
//   );
// }



import { useEffect, useRef, useState } from "react";
import { connectWS } from "./ws";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import NamePopup from "./components/NamePopup";

export default function App() {
  const socket = useRef(null);

  const [userName, setUserName] = useState("");
  const [showNamePopup, setShowNamePopup] = useState(true);

  const [currentRoom, setCurrentRoom] = useState("general");
  const [isDM, setIsDM] = useState(false);
  const [dmWith, setDmWith] = useState(null);

  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typers, setTypers] = useState([]);

  useEffect(() => {
    socket.current = connectWS();

    // Public room message (from others)
    socket.current.on("chatMessage", (msg) => {
      setMessages((prev) =>
        prev.find((m) => m.id === msg.id) ? prev : [...prev, msg]
      );
    });

    // Room history on join/switch
    socket.current.on("messageHistory", (history) => {
      setMessages(history);
    });

    // DM incoming
    socket.current.on("privateMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // DM history
    socket.current.on("dmHistory", ({ history }) => {
      setMessages(history);
    });

    // Online users list
    socket.current.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Typing
    socket.current.on("typing", (name) => {
      setTypers((prev) => (prev.includes(name) ? prev : [...prev, name]));
    });
    socket.current.on("stopTyping", (name) => {
      setTypers((prev) => prev.filter((t) => t !== name));
    });

    // Reactions
    socket.current.on("reactionUpdated", ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, reactions } : m))
      );
    });

    // System messages
    socket.current.on("systemMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.current.disconnect();
  }, []);

  function switchRoom(room) {
    setIsDM(false);
    setDmWith(null);
    setCurrentRoom(room);
    setMessages([]);
    setTypers([]);
    socket.current.emit("switchRoom", room);
  }

  function openDM(username) {
    if (username === userName) return;
    setIsDM(true);
    setDmWith(username);
    setMessages([]);
    setTypers([]);
    socket.current.emit("openDM", { withUser: username });
  }

  return (
    <>
      {showNamePopup && (
        <NamePopup
          setUserName={setUserName}
          setShowNamePopup={setShowNamePopup}
          socket={socket}
          defaultRoom={currentRoom}
        />
      )}

      {!showNamePopup && (
        <div className="relative h-screen flex overflow-hidden">
          <div className="mesh-bg" />
          <div className="grid-overlay" />
          <div className="scanline" />

          <Sidebar
            currentRoom={currentRoom}
            isDM={isDM}
            dmWith={dmWith}
            onlineUsers={onlineUsers}
            userName={userName}
            onSwitchRoom={switchRoom}
            onOpenDM={openDM}
          />

          <div className="relative z-10 flex-1 flex flex-col min-w-0">
            <Chat
              socket={socket}
              userName={userName}
              messages={messages}
              setMessages={setMessages}
              typers={typers}
              currentRoom={currentRoom}
              isDM={isDM}
              dmWith={dmWith}
            />
          </div>
        </div>
      )}
    </>
  );
}