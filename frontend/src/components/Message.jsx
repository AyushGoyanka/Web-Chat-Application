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





















// export default function Message({ m, mine }) {
//   function formatTime(ts) {
//     const d = new Date(ts);
//     return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
//   }

//   return (
//     <div className={`flex items-end gap-2 mb-2 ${mine ? "justify-end" : "justify-start"} ${mine ? "msg-mine" : "msg-other"}`}>

//       {/* Avatar — other side */}
//       {!mine && (
//         <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-[10px] font-bold text-white mb-0.5">
//           {m.sender[0]?.toUpperCase()}
//         </div>
//       )}

//       <div className={`flex flex-col ${mine ? "items-end" : "items-start"} max-w-[70%]`}>

//         {/* Sender name */}
//         {!mine && (
//           <span className="text-[10px] text-gray-500 ml-1 mb-1 tracking-wider uppercase">
//             {m.sender}
//           </span>
//         )}

//         {/* Bubble */}
//         <div
//           className={`relative px-4 py-2.5 text-sm leading-relaxed
//             ${mine
//               ? "bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border border-cyan-400/30 text-white rounded-2xl rounded-br-sm"
//               : "bg-white/[0.06] border border-white/10 text-gray-200 rounded-2xl rounded-bl-sm"
//             }`}
//         >
//           {/* Neon left bar for own messages */}
//           {mine && (
//             <div className="absolute right-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" />
//           )}

//           <p className="tracking-wide">{m.text}</p>

//           <div className={`flex items-center gap-1.5 mt-1 ${mine ? "justify-end" : "justify-start"}`}>
//             <span className="text-[9px] text-gray-600 font-mono">{formatTime(m.ts)}</span>
//             {mine && (
//               <svg className="w-3 h-3 text-cyan-400/60" fill="currentColor" viewBox="0 0 16 16">
//                 <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Avatar — my side */}
//       {mine && (
//         <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-black mb-0.5">
//           {m.sender[0]?.toUpperCase()}
//         </div>
//       )}

//     </div>
//   );
// }



import { useState } from "react";

const EMOJI_LIST = ["👍", "❤️", "😂", "😮", "🔥", "👏"];

export default function Message({ m, mine, onReact }) {
  const [showPicker, setShowPicker] = useState(false);

  function formatTime(ts) {
    const d = new Date(ts);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  // System message
  if (m.isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-[10px] text-gray-600 bg-white/5 px-3 py-1 rounded-full tracking-widest">
          {m.text}
        </span>
      </div>
    );
  }

  const reactions = m.reactions
    ? Object.entries(m.reactions).filter(([, users]) => users.length > 0)
    : [];

  return (
    <div className={`flex items-end gap-2 mb-2 group
      ${mine ? "justify-end" : "justify-start"}
      ${mine ? "msg-mine" : "msg-other"}`}
    >
      {/* Avatar — others */}
      {!mine && (
        <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-pink-400
          flex items-center justify-center text-[10px] font-bold text-white self-end mb-0.5">
          {m.sender[0]?.toUpperCase()}
        </div>
      )}

      <div className={`flex flex-col ${mine ? "items-end" : "items-start"} max-w-[70%] relative`}>

        {!mine && (
          <span className="text-[10px] text-gray-500 ml-1 mb-1 tracking-wider uppercase">
            {m.sender}
          </span>
        )}

        {/* Emoji picker trigger */}
        <div className={`absolute top-0 z-20
          ${mine ? "left-0 -translate-x-full pr-2" : "right-0 translate-x-full pl-2"}
          opacity-0 group-hover:opacity-100 transition-opacity duration-150`}
        >
          <button
            onClick={() => setShowPicker((v) => !v)}
            className="text-sm bg-white/5 border border-white/10 rounded-lg px-1.5 py-0.5
              text-gray-600 hover:text-gray-300 transition-colors"
          >
            😊
          </button>

          {showPicker && (
            <div className={`absolute top-8 ${mine ? "right-0" : "left-0"}
              flex gap-1 bg-[#0d0d1a] border border-white/10 rounded-xl p-2 shadow-2xl z-30`}
            >
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => { onReact(m.id, emoji); setShowPicker(false); }}
                  className="text-lg hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bubble */}
        <div className={`relative px-4 py-2.5 text-sm leading-relaxed
          ${mine
            ? "bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border border-cyan-400/30 text-white rounded-2xl rounded-br-sm"
            : "bg-white/[0.06] border border-white/10 text-gray-200 rounded-2xl rounded-bl-sm"
          }`}
        >
          {mine && (
            <div className="absolute right-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500" />
          )}

          <p className="tracking-wide">{m.text}</p>

          <div className={`flex items-center gap-1.5 mt-1 ${mine ? "justify-end" : "justify-start"}`}>
            <span className="text-[9px] text-gray-600">{formatTime(m.ts)}</span>
            {mine && (
              <svg className="w-3 h-3 text-cyan-400/60" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
              </svg>
            )}
          </div>
        </div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 px-1">
            {reactions.map(([emoji, users]) => (
              <button
                key={emoji}
                onClick={() => onReact(m.id, emoji)}
                title={users.join(", ")}
                className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full
                  px-2 py-0.5 text-xs hover:bg-white/10 hover:border-cyan-400/30 transition-all"
              >
                <span>{emoji}</span>
                <span className="text-gray-400 text-[10px]">{users.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Avatar — mine */}
      {mine && (
        <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500
          flex items-center justify-center text-[10px] font-bold text-black self-end mb-0.5">
          {m.sender[0]?.toUpperCase()}
        </div>
      )}
    </div>
  );
}

