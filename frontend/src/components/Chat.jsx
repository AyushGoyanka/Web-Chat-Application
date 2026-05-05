// import { useState, useRef, useEffect } from "react";
// import Header from "./Header";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";

// export default function Chat({ socket, userName, messages, setMessages, typers }) {
//   const [text, setText] = useState("");
//   const timer = useRef(null);

//   // ✅ SEND MESSAGE
//   function sendMessage() {
//     const t = text.trim();
//     if (!t) return;

//     const msg = {
//       id: Date.now(),
//       sender: userName,
//       text: t,
//       ts: Date.now(),
//     };

//     // update UI instantly
//     setMessages((prev) => [...prev, msg]);

//     // send to backend
//     if (socket.current) {
//       socket.current.emit("chatMessage", msg);
//     }

//     setText("");
//   }

//   // ✅ ENTER KEY HANDLING
//   function handleKeyDown(e) {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   }

//   // ✅ TYPING INDICATOR
//   useEffect(() => {
//     if (!socket.current) return;

//     if (text) {
//       socket.current.emit("typing", userName);
//       clearTimeout(timer.current);
//     }

//     timer.current = setTimeout(() => {
//       socket.current.emit("stopTyping", userName);
//     }, 1000);

//     return () => clearTimeout(timer.current);
//   }, [text, userName, socket]);

//   return (
//     <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      
//       <div className="w-full max-w-4xl h-[92vh] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
//         {/* HEADER */}
//         <Header userName={userName} typers={typers} />

//         {/* MESSAGES */}
//         <MessageList messages={messages} userName={userName} />

//         {/* INPUT */}
//         <MessageInput
//           text={text}
//           setText={setText}
//           sendMessage={sendMessage}
//           handleKeyDown={handleKeyDown}
//         />

//       </div>

//     </div>
//   );
// }









import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Chat({ socket, userName, messages, setMessages, typers }) {
  const [text, setText] = useState("");
  const timer = useRef(null);

  // ✅ SEND MESSAGE
  function sendMessage() {
    const t = text.trim();
    if (!t) return;

    const msg = {
      id: Date.now(),
      sender: userName,
      text: t,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, msg]);

    if (socket.current) {
      socket.current.emit("chatMessage", msg);
    }

    setText("");
  }

  // ✅ ENTER KEY HANDLING
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // ✅ TYPING INDICATOR
  useEffect(() => {
    if (!socket.current) return;

    if (text) {
      socket.current.emit("typing", userName);
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      socket.current.emit("stopTyping", userName);
    }, 1000);

    return () => clearTimeout(timer.current);
  }, [text, userName, socket]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Backgrounds */}
      <div className="mesh-bg" />
      <div className="grid-overlay" />
      <div className="scanline" />

      {/* Chat window */}
      <div className="relative z-10 w-full max-w-2xl h-[88vh] mx-4 glass-panel neon-border rounded-2xl flex flex-col overflow-hidden">

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        <Header userName={userName} typers={typers} />
        <MessageList messages={messages} userName={userName} />
        <MessageInput
          text={text}
          setText={setText}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      </div>

    </div>
  );
}