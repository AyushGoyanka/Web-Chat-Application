export default function Message({

    m,

    mine


}) {



    function formatTime(ts){


        if(!ts) return "";


        const d=new Date(ts);


        return `${

            d.getHours()

        }:${

            d.getMinutes().toString().padStart(2,"0")

        }`;



    }






    return (



<div

className={

`

flex gap-2 mb-3 items-end

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



(

m.avatar

?


<img

src={m.avatar}

className="w-8 h-8 rounded-full object-cover"

/>


:


<div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center text-xs font-bold">


{m.sender?.[0]?.toUpperCase()}


</div>


)



}









<div

className={

`

max-w-[70%]

${

mine

?

"items-end"

:

"items-start"

}

flex flex-col

`

}

>








{

!mine &&


<span className="text-[10px] text-gray-500 mb-1">

{m.sender}

</span>


}









<div

className={

`

px-4 py-2 rounded-2xl border


${

mine

?

"bg-cyan-500/20 border-cyan-400/30 text-white rounded-br-sm"

:

"bg-white/10 border-white/10 text-gray-200 rounded-bl-sm"

}


`

}


>



<p className="text-sm break-words">

{m.text}

</p>









<div className="flex justify-end gap-2 mt-1">


<span className="text-[10px] text-gray-500">

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



(

m.avatar

?

<img

src={m.avatar}

className="w-8 h-8 rounded-full object-cover"

/>



:


<div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-xs font-bold text-black">


{m.sender?.[0]?.toUpperCase()}


</div>



)



}






</div>



    );


}