// // export default function Message({ m, mine }) {
// //   function formatTime(ts) {
// //     const d = new Date(ts);
// //     return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
// //   }

// //   return (
// //     <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      
// //       <div
// //         className={`max-w-[70%] px-4 py-2 my-1 rounded-2xl text-sm shadow
// //         ${
// //           mine
// //             ? "bg-green-500 text-white rounded-br-sm"
// //             : "bg-white text-gray-800 rounded-bl-sm"
// //         }`}
// //       >
// //         <div>{m.text}</div>

// //         <div className="flex justify-between text-[10px] mt-1 opacity-70">
// //           <span>{m.sender}</span>
// //           <span>{formatTime(m.ts)}</span>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }





















export default function Message({ m, mine }) {
  function formatTime(ts) {
    const d = new Date(ts);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  return (
    <div className={`flex items-end gap-2 mb-2 ${mine ? "justify-end" : "justify-start"} ${mine ? "msg-mine" : "msg-other"}`}>

      {/* Avatar — other side */}
      {!mine && (
        <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-[10px] font-bold text-white mb-0.5">
          {m.sender[0]?.toUpperCase()}
        </div>
      )}

      <div className={`flex flex-col ${mine ? "items-end" : "items-start"} max-w-[70%]`}>

        {/* Sender name */}
        {!mine && (
          <span className="text-[10px] text-gray-500 ml-1 mb-1 tracking-wider uppercase">
            {m.sender}
          </span>
        )}

        {/* Bubble */}
        <div
          className={`relative px-4 py-2.5 text-sm leading-relaxed
            ${mine
              ? "bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border border-cyan-400/30 text-white rounded-2xl rounded-br-sm"
              : "bg-white/[0.06] border border-white/10 text-gray-200 rounded-2xl rounded-bl-sm"
            }`}
        >
          {/* Neon left bar for own messages */}
          {mine && (
            <div className="absolute right-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" />
          )}

          <p className="tracking-wide">{m.text}</p>

          <div className={`flex items-center gap-1.5 mt-1 ${mine ? "justify-end" : "justify-start"}`}>
            <span className="text-[9px] text-gray-600 font-mono">{formatTime(m.ts)}</span>
            {mine && (
              <svg className="w-3 h-3 text-cyan-400/60" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Avatar — my side */}
      {mine && (
        <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-black mb-0.5">
          {m.sender[0]?.toUpperCase()}
        </div>
      )}

    </div>
  );
}

