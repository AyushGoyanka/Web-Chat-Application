// // export default function Header({ userName, typers }) {
// //   return (
// //     <div className="flex items-center px-5 py-3 border-b border-white/10 bg-white/5">
      
// //       <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
// //         {userName[0]?.toUpperCase()}
// //       </div>

// //       <div className="ml-3 flex-1">
// //         <div className="text-white font-semibold">Realtime Chat</div>

// //         {typers.length > 0 ? (
// //           <div className="text-xs text-green-300">
// //             {typers.join(", ")} typing...
// //           </div>
// //         ) : (
// //           <div className="text-xs text-gray-400">Online</div>
// //         )}
// //       </div>

// //       <div className="text-sm text-gray-300">{userName}</div>
// //     </div>
// //   );
// // }























export default function Header({ userName, typers }) {
  const others = typers.filter((t) => t !== userName);

  return (
    <div className="relative flex items-center px-5 py-4 border-b border-white/5 bg-white/[0.02]">

      {/* Left accent line */}
      <div className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />

      {/* Logo / Brand */}
      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-9 h-9 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/30 to-violet-500/30 border border-cyan-400/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <div>
          <div className="font-display text-white font-bold text-sm tracking-wide leading-none mb-1">
            NEXUS<span className="neon-text">CHAT</span>
          </div>

          {others.length > 0 ? (
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
              <span className="text-[10px] text-cyan-400 tracking-wider">
                {others.join(", ")} typing
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="online-dot" />
              <span className="text-[10px] text-gray-500 tracking-widest uppercase">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* User badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-black">
          {userName[0]?.toUpperCase()}
        </div>
        <span className="text-xs text-gray-400 tracking-wide">{userName}</span>
      </div>

    </div>
  );
}


