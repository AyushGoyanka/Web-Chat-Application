// // import { useState } from "react";

// // export default function NamePopup({ setUserName, setShowNamePopup, socket }) {
// //   const [input, setInput] = useState("");

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     if (!input.trim()) return;

// //     socket.current.emit("joinRoom", input);
// //     setUserName(input);
// //     setShowNamePopup(false);
// //   }

// //   return (
// //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      
// //       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-80">
        
// //         <h2 className="text-lg font-semibold">Enter your name</h2>

// //         <input
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           className="border w-full p-2 mt-3"
// //           placeholder="Your name"
// //         />

// //         <button className="w-full mt-3 bg-green-500 text-white py-2 rounded">
// //           Join Chat
// //         </button>

// //       </form>
// //     </div>
// //   );
// // }













// import { useState } from "react";

// export default function NamePopup({ setUserName, setShowNamePopup, socket }) {
//   const [input, setInput] = useState("");
//   const [focused, setFocused] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!input.trim()) return;
//     socket.current.emit("joinRoom", input.trim());
//     setUserName(input.trim());
//     setShowNamePopup(false);
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

//       {/* Card */}
//       <div className="popup-enter relative z-10 w-[360px] glass-panel neon-border rounded-2xl p-8">

//         {/* Top accent line */}
//         <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

//         {/* Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="relative w-16 h-16">
//             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center">
//               <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <div className="avatar-pulse absolute inset-0 rounded-full" />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="font-display text-center text-2xl font-800 text-white mb-1">
//           Enter the<span className="neon-text"> Nexus</span>
//         </h2>
//         <p className="text-center text-xs text-gray-500 mb-6 tracking-widest uppercase">
//           Real-time encrypted chat
//         </p>

//         {/* Input */}
//         <form onSubmit={handleSubmit}>
//           <div className={`input-wrapper relative border rounded-xl px-4 py-3 mb-4 transition-all duration-300
//             ${focused ? 'border-cyan-400/40' : 'border-white/10'} bg-white/5`}>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onFocus={() => setFocused(true)}
//               onBlur={() => setFocused(false)}
//               className="w-full bg-transparent text-white text-sm placeholder-gray-600 outline-none tracking-wide"
//               placeholder="Your codename..."
//               autoFocus
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={!input.trim()}
//             className="send-btn relative w-full py-3 rounded-xl text-sm font-semibold text-white tracking-widest uppercase
//               disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
//           >
//             <span className="relative z-10">Initialize →</span>
//           </button>
//         </form>

//         {/* Bottom accent */}
//         <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
//       </div>
//     </div>
//   );
// }





import { useState } from "react";

export default function NamePopup({ setUserName, setShowNamePopup, socket, defaultRoom = "general" }) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    socket.current.emit("joinRoom", { username: input.trim(), room: defaultRoom });
    setUserName(input.trim());
    setShowNamePopup(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="mesh-bg" />
      <div className="grid-overlay" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="popup-enter relative z-10 w-[360px] glass-panel neon-border rounded-2xl p-8">

        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20
              border border-cyan-400/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="avatar-pulse absolute inset-0 rounded-full" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-center text-2xl font-bold text-white mb-1">
          Enter the<span className="neon-text"> Nexus</span>
        </h2>
        <p className="text-center text-xs text-gray-500 mb-6 tracking-widest uppercase">
          Real-time chat · 4 rooms · DMs
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className={`input-wrapper relative border rounded-xl px-4 py-3 mb-4 transition-all duration-300
            ${focused ? "border-cyan-400/40" : "border-white/10"} bg-white/5`}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full bg-transparent text-white text-sm placeholder-gray-600 outline-none tracking-wide"
              placeholder="Your codename..."
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="send-btn relative w-full py-3 rounded-xl text-sm font-semibold text-white
              tracking-widest uppercase
              disabled:opacity-30 disabled:cursor-not-allowed
              disabled:hover:transform-none disabled:hover:shadow-none"
          >
            <span className="relative z-10">Initialize →</span>
          </button>
        </form>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      </div>
    </div>
  );
}