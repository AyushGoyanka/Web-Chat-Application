// // export default function MessageInput({ text, setText, sendMessage, handleKeyDown }) {
// //   return (
// //     <div className="p-3 border-t border-white/10 bg-white/5">
      
// //       <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
        
// //         <textarea
// //           rows={1}
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           onKeyDown={handleKeyDown}
// //           placeholder="Type a message..."
// //           className="flex-1 bg-transparent text-white outline-none resize-none"
// //         />

// //         <button
// //           onClick={sendMessage}
// //           className="bg-green-500 text-white px-4 py-1 rounded-full"
// //         >
// //           Send
// //         </button>

// //       </div>
// //     </div>
// //   );
// // }













// export default function MessageInput({ text, setText, sendMessage, handleKeyDown }) {
//   return (
//     <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02]">

//       <div className="input-wrapper flex items-end gap-3 border border-white/10 rounded-2xl px-4 py-3 bg-white/5 transition-all duration-300">

//         {/* Textarea */}
//         <textarea
//           rows={1}
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//             // auto-resize
//             e.target.style.height = "auto";
//             e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
//           }}
//           onKeyDown={handleKeyDown}
//           placeholder="Transmit a message..."
//           className="chat-input flex-1 bg-transparent text-white text-sm placeholder-gray-600 resize-none leading-relaxed tracking-wide min-h-[24px] max-h-[120px]"
//           style={{ height: "24px" }}
//         />

//         {/* Send button */}
//         <button
//           onClick={sendMessage}
//           disabled={!text.trim()}
//           className="send-btn flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
//             disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
//         >
//           <span className="relative z-10">
//             <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
//             </svg>
//           </span>
//         </button>

//       </div>

//       {/* Hint */}
//       <p className="text-[10px] text-gray-700 text-center mt-2 tracking-widest">
//         ENTER to send · SHIFT+ENTER for new line
//       </p>

//     </div>
//   );
// }




export default function MessageInput({ text, setText, sendMessage, handleKeyDown }) {
  return (
    <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02] flex-shrink-0">

      <div className="input-wrapper flex items-end gap-2 border border-white/10 rounded-2xl px-4 py-2.5 bg-white/5 transition-all duration-300">

        <textarea
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
          onKeyDown={handleKeyDown}
          placeholder="Transmit a message..."
          className="chat-input flex-1 bg-transparent text-white text-sm placeholder-gray-600
            resize-none leading-relaxed tracking-wide min-h-[24px] max-h-[120px]"
          style={{ height: "24px" }}
        />

        <button
          onClick={sendMessage}
          disabled={!text.trim()}
          className="send-btn flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
            disabled:opacity-20 disabled:cursor-not-allowed
            disabled:hover:transform-none disabled:hover:shadow-none"
        >
          <span className="relative z-10">
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </span>
        </button>

      </div>

      <p className="text-[10px] text-gray-700 text-center mt-1.5 tracking-widest">
        ENTER to send · SHIFT+ENTER for new line
      </p>

    </div>
  );
}