import { useState } from "react";
import EmojiPicker from "emoji-picker-react";


export default function MessageInput({

    text,

    setText,

    sendMessage,

    handleKeyDown


}) {


    const [showEmoji,setShowEmoji] = useState(false);





    function addEmoji(emojiData){


        setText(prev => prev + emojiData.emoji);


    }






    return (



<div className="relative border-t border-white/10 bg-black/20 p-4">







{/* Emoji Picker */}


{

showEmoji &&



<div className="absolute bottom-20 left-4 z-50">


<EmojiPicker


onEmojiClick={addEmoji}


/>


</div>



}









<div className="flex items-center gap-3">








{/* Emoji Button */}


<button


type="button"


onClick={()=>setShowEmoji(prev=>!prev)}


className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-xl"


>


😊


</button>












{/* INPUT */}



<textarea


value={text}


onChange={(e)=>setText(e.target.value)}


onKeyDown={handleKeyDown}


placeholder="Type a message..."


rows="1"


className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400/40"


/>









{/* SEND BUTTON */}


<button


onClick={sendMessage}


disabled={!text.trim()}


className="px-5 py-3 rounded-xl bg-cyan-400 text-black font-bold disabled:opacity-30"


>


Send


</button>







</div>






</div>



    );


}