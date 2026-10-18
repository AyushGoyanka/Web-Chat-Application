import { useState } from "react";
import axios from "axios";

export default function Header({
  userName,
  profile,
  selectedChat,
  users,
  typers,
  messages
}) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const isGroup = selectedChat === "GROUP";
  const currentUser = users?.find((u) => u.username === selectedChat);
  const typingUsers = typers?.filter((t) => t !== userName) || [];

  // AI Summarizer API Call (Port Fixed to 4600)
  const handleSummarize = async () => {
    if (!messages || messages.length === 0) return;
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:4600/api/ai/summarize", { 
        chatHistory: messages 
      });
      setSummary(data.summary);
    } catch (error) {
      console.error("Error summarizing chat:", error);
    }
    setLoading(false);
  };

  return (
    <div className="relative flex items-center px-5 py-4 border-b border-white/10 bg-white/[0.02]">
      {/* LEFT ACCENT */}
      <div className="absolute left-0 top-3 bottom-3 w-px bg-cyan-400" />

      <div className="flex items-center gap-3 flex-1">
        {/* AVATAR */}
        <div className="w-11 h-11 rounded-full overflow-hidden border border-cyan-400/30 flex items-center justify-center">
          {isGroup ? (
            <span className="text-xl">🌎</span>
          ) : currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-cyan-400 font-bold">
              {selectedChat?.[0]?.toUpperCase()}
            </span>
          )}
        </div>

        <div>
          {/* NAME */}
          <div className="text-white font-bold text-sm">
            {isGroup ? "NEXUS CHAT" : selectedChat}
          </div>

          {/* STATUS */}
          {typingUsers.length > 0 ? (
            <div className="text-xs text-cyan-400 flex items-center gap-2">
              <div className="flex gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
              {typingUsers.join(", ")} typing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isGroup
                    ? "bg-green-400"
                    : currentUser?.online
                    ? "bg-green-400"
                    : "bg-gray-500"
                }`}
              />
              <span className="text-xs text-gray-500">
                {isGroup ? "Live Group" : currentUser?.online ? "Online" : "Offline"}
              </span>
            </div>
          )}

          {/* BIO */}
          {!isGroup && currentUser?.bio && (
            <p className="text-[11px] text-gray-500 mt-1">
              {currentUser.bio}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="flex items-center gap-4">
        
        {/* AI SUMMARIZE BUTTON */}
        <button
          onClick={handleSummarize}
          disabled={loading || !messages?.length}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold hover:bg-cyan-400/20 disabled:opacity-30 transition-all"
        >
          {loading ? "✨ Summarizing..." : "✨ Summarize"}
        </button>

        {/* MY PROFILE */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center text-black text-xs font-bold">
              {userName[0]?.toUpperCase()}
            </div>
          )}
          <span className="text-xs text-gray-400">{userName}</span>
        </div>
      </div>

      {/* AI SUMMARY POPUP MODAL */}
      {summary && (
        <div className="absolute top-20 right-5 w-80 max-h-96 overflow-y-auto custom-scrollbar bg-black/90 backdrop-blur-xl border border-cyan-400/30 rounded-xl p-5 shadow-2xl z-50">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h3 className="font-bold text-cyan-400 text-sm">✨ Chat Summary</h3>
            <button 
              onClick={() => setSummary(null)} 
              className="text-gray-400 hover:text-red-400 text-lg leading-none"
            >
              ✕
            </button>
          </div>
          <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}