const ROOMS = [
  { name: "general", icon: "💬" },
  { name: "random",  icon: "🎲" },
  { name: "tech",    icon: "💻" },
  { name: "gaming",  icon: "🎮" },
];

export default function Sidebar({
  currentRoom, isDM, dmWith,
  onlineUsers, userName,
  onSwitchRoom, onOpenDM,
}) {
  const others = onlineUsers.filter((u) => u !== userName);

  return (
    <div className="relative z-10 w-56 flex-shrink-0 flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-xl">

      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* Brand */}
      <div className="px-4 pt-5 pb-4 border-b border-white/5">
        <div className="font-display font-bold text-white text-sm tracking-widest">
          NEXUS<span className="neon-text">CHAT</span>
        </div>
        <div className="text-[10px] text-gray-600 mt-0.5 tracking-widest uppercase">
          {onlineUsers.length} online
        </div>
      </div>

      {/* Channels */}
      <div className="px-3 pt-4">
        <p className="text-[10px] text-gray-600 tracking-widest uppercase px-1 mb-2">Channels</p>
        <div className="space-y-0.5">
          {ROOMS.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => onSwitchRoom(name)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-200 text-left
                ${!isDM && currentRoom === name
                  ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
            >
              <span>{icon}</span>
              <span className="tracking-wide"># {name}</span>
              {!isDM && currentRoom === name && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 my-3 h-px bg-white/5" />

      {/* Online Users */}
      <div className="px-3 flex-1 overflow-y-auto">
        <p className="text-[10px] text-gray-600 tracking-widest uppercase px-1 mb-2">
          Online · {onlineUsers.length}
        </p>

        {/* Me */}
        <div className="flex items-center gap-2.5 px-3 py-2 mb-0.5">
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[9px] font-bold text-black">
              {userName[0]?.toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-black" />
          </div>
          <span className="text-xs text-cyan-300 tracking-wide truncate">{userName}</span>
          <span className="ml-auto text-[9px] text-gray-600 flex-shrink-0">you</span>
        </div>

        {/* Others — click to DM */}
        {others.map((user) => (
          <button
            key={user}
            onClick={() => onOpenDM(user)}
            title={`DM ${user}`}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-200 text-left
              ${isDM && dmWith === user
                ? "bg-violet-400/10 text-violet-300 border border-violet-400/20"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
          >
            <div className="relative flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-[9px] font-bold text-white">
                {user[0]?.toUpperCase()}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-black" />
            </div>
            <span className="tracking-wide truncate">{user}</span>
            {isDM && dmWith === user && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
            )}
          </button>
        ))}

        {others.length === 0 && (
          <p className="px-3 py-2 text-[10px] text-gray-700 italic">No others online yet</p>
        )}
      </div>

      {/* Bottom user badge */}
      <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-black">
              {userName[0]?.toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-black" />
          </div>
          <div>
            <div className="text-xs text-white font-medium tracking-wide">{userName}</div>
            <div className="text-[9px] text-gray-600">Online</div>
          </div>
        </div>
      </div>

    </div>
  );
}