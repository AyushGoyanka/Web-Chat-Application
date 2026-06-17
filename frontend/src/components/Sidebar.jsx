export default function Sidebar({
  onlineUsers,
  userName,
  selectedChat,
  setSelectedChat,
}) {
  return (
    <div className="w-64 border-r border-white/10 bg-black/20 overflow-y-auto">

      <div className="p-4 border-b border-white/10">
        <h2 className="text-white font-bold">Chats</h2>
      </div>

      <div
        onClick={() => setSelectedChat("GROUP")}
        className={`p-4 cursor-pointer transition ${
          selectedChat === "GROUP"
            ? "bg-cyan-500/20"
            : "hover:bg-white/5"
        }`}
      >
        🌎 Group Chat
      </div>

      {onlineUsers
        .filter((u) => u !== userName)
        .map((user) => (
          <div
            key={user}
            onClick={() => setSelectedChat(user)}
            className={`p-4 cursor-pointer transition ${
              selectedChat === user
                ? "bg-cyan-500/20"
                : "hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white">{user}</span>
            </div>
          </div>
        ))}
    </div>
  );
}