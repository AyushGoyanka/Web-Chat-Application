import { useEffect, useRef } from "react";
import Message from "./Message";


export default function MessageList({

    messages = [],

    userName


}) {


    const bottomRef = useRef();




    useEffect(()=>{


        bottomRef.current?.scrollIntoView({

            behavior:"smooth"

        });


    },[messages]);







    return (


<div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">







{

messages.length===0 &&


<div className="h-full flex flex-col items-center justify-center opacity-40">


<div className="text-4xl mb-3">

💬

</div>


<p className="text-xs text-gray-500 uppercase tracking-widest">

Start chatting

</p>



</div>


}








{

messages.map((m,index)=>(


<Message


key={m.id || index}


m={m}


mine={m.sender===userName}


/>



))


}







<div ref={bottomRef}/>



</div>



    );

}