// // import { useEffect, useRef } from "react";
// // import Message from "./Message";

// // export default function MessageList({ messages, userName }) {
// //   const bottomRef = useRef();

// //   useEffect(() => {
// //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   return (
// //     <div className="flex-1 overflow-y-auto px-3 py-2">
// //       {messages.map((m) => (
// //         <Message key={m.id} m={m} mine={m.sender === userName} />
// //       ))}
// //       <div ref={bottomRef} />
// //     </div>
// //   );
// // }










// import { useEffect, useRef } from "react";
// import Message from "./Message";

// export default function MessageList({ messages, userName }) {
//   const bottomRef = useRef();

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">

//       {messages.length === 0 && (
//         <div className="h-full flex flex-col items-center justify-center gap-3 opacity-30">
//           <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center">
//             <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//           </div>
//           <p className="text-xs text-gray-500 tracking-widest uppercase">Start the transmission</p>
//         </div>
//       )}

//       {messages.map((m) => (
//         <Message key={m.id} m={m} mine={m.sender === userName} />
//       ))}

//       <div ref={bottomRef} />
//     </div>
//   );
// }







import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageList({ messages, userName, onReact }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">

      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center gap-3 opacity-30">
          <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 tracking-widest uppercase">Start the transmission</p>
        </div>
      )}

      {messages.map((m) => (
        <Message
          key={m.id}
          m={m}
          mine={m.sender === userName}
          onReact={onReact}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}