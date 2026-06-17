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
import NamePopup from "./components/NamePopup";

export default function App() {
  const socket = useRef(null);

  const [userName, setUserName] = useState("");
  const [showNamePopup, setShowNamePopup] = useState(true);

  // GROUP CHAT
  const [groupMessages, setGroupMessages] = useState([]);

  // PRIVATE CHAT
  const [privateMessages, setPrivateMessages] = useState({});

  // ONLINE USERS
  const [onlineUsers, setOnlineUsers] = useState([]);

  // SELECTED CHAT
  const [selectedChat, setSelectedChat] = useState("GROUP");

  // TYPING USERS
  const [typers, setTypers] = useState([]);

  useEffect(() => {
    socket.current = connectWS();

    // GROUP CHAT MESSAGE
    socket.current.on("chatMessage", (msg) => {
      setGroupMessages((prev) => [...prev, msg]);
    });

    // PRIVATE MESSAGE
    socket.current.on("privateMessage", (msg) => {
      setPrivateMessages((prev) => ({
        ...prev,
        [msg.partner]: [...(prev[msg.partner] || []), msg],
      }));
    });

    // ONLINE USERS
    socket.current.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // USERNAME EXISTS
    socket.current.on("usernameTaken", () => {
      alert("Username already taken");
      setShowNamePopup(true);
    });

    // GROUP TYPING
    socket.current.on("typing", (name) => {
      setTypers((prev) =>
        prev.includes(name) ? prev : [...prev, name]
      );
    });

    socket.current.on("stopTyping", (name) => {
      setTypers((prev) =>
        prev.filter((t) => t !== name)
      );
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  // CURRENT CHAT MESSAGES
  const currentMessages =
    selectedChat === "GROUP"
      ? groupMessages
      : privateMessages[selectedChat] || [];

  return (
    <>
      {showNamePopup && (
        <NamePopup
          setUserName={setUserName}
          setShowNamePopup={setShowNamePopup}
          socket={socket}
        />
      )}

      {!showNamePopup && (
        <Chat
          socket={socket}
          userName={userName}

          // Messages currently open
          messages={currentMessages}

          // Group chat
          groupMessages={groupMessages}
          setGroupMessages={setGroupMessages}

          // Private chat
          privateMessages={privateMessages}
          setPrivateMessages={setPrivateMessages}

          // Sidebar
          onlineUsers={onlineUsers}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}

          // Typing
          typers={typers}
        />
      )}
    </>
  );
}