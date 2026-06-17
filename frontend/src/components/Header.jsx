export default function Header({

    userName,

    profile,

    selectedChat,

    users,

    typers


}) {



    const isGroup = selectedChat==="GROUP";






    const currentUser = users?.find(

        (u)=>u.username===selectedChat

    );






    const typingUsers = typers?.filter(

        (t)=>t!==userName

    ) || [];









    return (



<div className="relative flex items-center px-5 py-4 border-b border-white/10 bg-white/[0.02]">





{/* LEFT ACCENT */}


<div className="absolute left-0 top-3 bottom-3 w-px bg-cyan-400"/>








<div className="flex items-center gap-3 flex-1">







{/* AVATAR */}



<div className="w-11 h-11 rounded-full overflow-hidden border border-cyan-400/30 flex items-center justify-center">



{

isGroup

?


<span className="text-xl">

🌎

</span>


:

currentUser?.avatar

?


<img

src={currentUser.avatar}

className="w-full h-full object-cover"

/>



:


<span className="text-cyan-400 font-bold">


{selectedChat?.[0]?.toUpperCase()}


</span>



}





</div>













<div>








{/* NAME */}



<div className="text-white font-bold text-sm">


{

isGroup

?

"NEXUS CHAT"

:

selectedChat



}



</div>









{/* STATUS */}



{

typingUsers.length>0

?


<div className="text-xs text-cyan-400 flex items-center gap-2">


<div className="flex gap-1">


<span className="typing-dot"/>

<span className="typing-dot"/>

<span className="typing-dot"/>


</div>



{typingUsers.join(", ")} typing...



</div>







:


<div className="flex items-center gap-2">



<div

className={

`

w-2 h-2 rounded-full


${

isGroup

?

"bg-green-400"

:

currentUser?.online

?

"bg-green-400"

:

"bg-gray-500"

}

`

}


/>





<span className="text-xs text-gray-500">


{

isGroup

?

"Live Group"

:

currentUser?.online

?

"Online"

:

"Offline"

}



</span>



</div>



}



{/* BIO */}



{

!isGroup && currentUser?.bio &&



<p className="text-[11px] text-gray-500 mt-1">

{currentUser.bio}

</p>



}



</div>





</div>












{/* MY PROFILE */}



<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">





{

profile?.avatar

?


<img

src={profile.avatar}

className="w-7 h-7 rounded-full object-cover"

/>



:


<div className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center text-black text-xs font-bold">


{userName[0]?.toUpperCase()}


</div>



}






<span className="text-xs text-gray-400">


{userName}


</span>




</div>







</div>



    );

}