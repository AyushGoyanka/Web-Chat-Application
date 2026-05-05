import { useEffect, useRef, useState } from "react";
import { connectWS } from "./ws";
import Chat from "./components/Chat";
import NamePopup from "./components/NamePopup";

export default function App() {
  const socket = useRef(null);
  const timer = useRef(null);

  const [userName, setUserName] = useState("");
  const [showNamePopup, setShowNamePopup] = useState(true);
  const [messages, setMessages] = useState([]);
  const [typers, setTypers] = useState([]);

  useEffect(() => {
    socket.current = connectWS();

    socket.current.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.current.on("typing", (name) => {
      setTypers((prev) => (prev.includes(name) ? prev : [...prev, name]));
    });

    socket.current.on("stopTyping", (name) => {
      setTypers((prev) => prev.filter((t) => t !== name));
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

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
          messages={messages}
          setMessages={setMessages}
          typers={typers}
        />
      )}
    </>
  );
}