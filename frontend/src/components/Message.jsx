export default function Message({ m, mine }) {
  function formatTime(ts) {
    const date = new Date(
      ts || m.createdAt || Date.now()
    );

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function isOnlyEmoji(text) {
    if (!text) return false;

    const emojiRegex =
      /^(\p{Extended_Pictographic}|\s)+$/u;

    return emojiRegex.test(text);
  }

  const avatar =
    m.avatar && m.avatar.length > 0;

  return (
    <div
      className={`flex items-end gap-2 mb-4 ${
        mine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!mine && (
        <>
          {avatar ? (
            <img
              src={m.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover border border-cyan-400/30"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              {m.sender?.[0]?.toUpperCase()}
            </div>
          )}
        </>
      )}

      <div
        className={`flex flex-col max-w-[75%] ${
          mine
            ? "items-end"
            : "items-start"
        }`}
      >
        {!mine && (
          <>
            <span className="text-xs text-cyan-400 mb-1">
              {m.sender}
            </span>

            {m.bio && (
              <span className="text-[10px] text-gray-500 mb-1">
                {m.bio}
              </span>
            )}
          </>
        )}

        <div
          className={`px-4 py-3 rounded-2xl border backdrop-blur-sm ${
            mine
              ? "bg-cyan-500/20 border-cyan-400/30 text-white rounded-br-sm"
              : "bg-white/5 border-white/10 text-gray-200 rounded-bl-sm"
          }`}
        >
          <p
            className={`break-words ${
              isOnlyEmoji(m.text)
                ? "text-5xl"
                : "text-sm"
            }`}
          >
            {m.text}
          </p>

          <div className="flex justify-end items-center gap-2 mt-2">
            <span className="text-[10px] text-gray-500">
              {formatTime(m.ts)}
            </span>

            {mine && (
              <span className="text-cyan-400 text-xs">
                ✓
              </span>
            )}
          </div>
        </div>
      </div>

      {mine && (
        <>
          {avatar ? (
            <img
              src={m.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover border border-cyan-400/30"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-black text-xs font-bold">
              {m.sender?.[0]?.toUpperCase()}
            </div>
          )}
        </>
      )}
    </div>
  );
}