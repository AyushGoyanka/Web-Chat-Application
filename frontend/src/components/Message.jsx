export default function Message({ m, mine }) {


    function formatTime(ts){

        if(!ts) return "";

        const d = new Date(ts);

        return `${d.getHours()}:${d.getMinutes()
            .toString()
            .padStart(2,"0")}`;

    }






    function isOnlyEmoji(text){

        if(!text) return false;


        const emojiRegex =
        /^(\p{Extended_Pictographic}|\s)+$/u;


        return emojiRegex.test(text);

    }







    return (



<div

className={

`
flex items-end gap-2 mb-3

${

mine

?

"justify-end"

:

"justify-start"

}

`

}

>








{/* OTHER USER AVATAR */}


{

!mine &&



<div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-xs font-bold text-white">


{m.sender?.[0]?.toUpperCase()}


</div>



}









<div

className={

`

flex flex-col max-w-[70%]

${

mine

?

"items-end"

:

"items-start"

}

`

}


>









{/* Sender name */}


{

!mine &&



<span className="text-[10px] text-gray-500 mb-1">

{m.sender}

</span>



}









<div

className={

`

relative px-4 py-2.5 rounded-2xl border


${

mine

?

"bg-cyan-500/20 border-cyan-400/30 text-white rounded-br-sm"

:

"bg-white/[0.06] border-white/10 text-gray-200 rounded-bl-sm"

}


`

}


>








<p

className={

`

tracking-wide break-words

${

isOnlyEmoji(m.text)

?

"text-4xl"

:

"text-sm"

}

`

}

>


{m.text}



</p>









<div className="flex items-center justify-end gap-2 mt-1">



<span className="text-[10px] text-gray-500 font-mono">

{formatTime(m.ts)}

</span>







{

mine &&



<span className="text-cyan-400 text-xs">

✓

</span>



}



</div>








</div>









</div>









{/* MY AVATAR */}


{

mine &&



<div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xs font-bold text-black">


{m.sender?.[0]?.toUpperCase()}


</div>



}






</div>



    );

}