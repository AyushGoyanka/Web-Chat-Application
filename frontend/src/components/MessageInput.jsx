import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios"; // Added for API calls

export default function MessageInput({
  text,
  setText,
  sendMessage,
  handleKeyDown,
  suggestions,       // Naya prop AI replies ke liye
  setSuggestions     // Naya prop suggestions clear karne ke liye
}) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false); // Naya state API loading ke liye

  function addEmoji(emojiData) {
    setText((prev) => prev + emojiData.emoji);
  }

  // AI Rewriter Function
  const rewriteMessage = async (tone) => {
    if (!text) return;
    setIsRewriting(true);
    try {
      const { data } = await axios.post("http://localhost:4600/api/ai/rewrite", {
        draftMessage: text,
        tone,
      });
      setText(data.rewrittenText);
    } catch (error) {
      console.error("Error rewriting message:", error);
    }
    setIsRewriting(false);
  };

  return (
    <div className="relative border-t border-white/10 bg-black/20 p-4">
      
      {/* AI Smart Replies UI (Input ke upar dikhega) */}
      {suggestions && suggestions.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 custom-scrollbar">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => {
                setText(sug);
                setSuggestions([]); // Click karne pe suggestions hide kar do
              }}
              className="bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 text-sm px-4 py-1.5 rounded-full hover:bg-cyan-400/20 transition-all whitespace-nowrap"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-20 left-4 z-50">
          <EmojiPicker onEmojiClick={addEmoji} theme="dark" />
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmoji((prev) => !prev)}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-xl shrink-0"
        >
          😊
        </button>

        {/* INPUT */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows="1"
          className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400/40 custom-scrollbar"
        />

        {/* AI Rewrite Dropdown */}
        <div className="relative shrink-0">
          {isRewriting ? (
            <span className="text-xs text-cyan-400 px-2">✨ Wait...</span>
          ) : (
            <select
              onChange={(e) => {
                if (e.target.value) rewriteMessage(e.target.value);
                e.target.value = ""; // Trigger hone ke baad wapas reset kar do
              }}
              className="bg-white/5 border border-white/10 text-white/70 text-sm rounded-xl px-2 py-3 cursor-pointer outline-none hover:bg-white/10 appearance-none"
            >
              <option value="" className="text-black">✨ AI</option>
              <option value="professional" className="text-black">Professional</option>
              <option value="friendly" className="text-black">Friendly</option>
              <option value="concise" className="text-black">Shorter</option>
            </select>
          )}
        </div>

        {/* SEND BUTTON */}
        <button
          onClick={sendMessage}
          disabled={!text.trim()}
          className="px-5 py-3 rounded-xl bg-cyan-400 text-black font-bold disabled:opacity-30 shrink-0 transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  );
}