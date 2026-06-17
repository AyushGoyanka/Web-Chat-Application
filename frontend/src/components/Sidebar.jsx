// export default function Sidebar({
//   onlineUsers,
//   userName,
//   selectedChat,
//   setSelectedChat,
// }) {
//   return (
//     <div className="w-64 border-r border-white/10 bg-black/20 overflow-y-auto">

//       <div className="p-4 border-b border-white/10">
//         <h2 className="text-white font-bold">Chats</h2>
//       </div>

//       <div
//         onClick={() => setSelectedChat("GROUP")}
//         className={`p-4 cursor-pointer transition ${
//           selectedChat === "GROUP"
//             ? "bg-cyan-500/20"
//             : "hover:bg-white/5"
//         }`}
//       >
//         🌎 Group Chat
//       </div>

//       {onlineUsers
//         .filter((u) => u !== userName)
//         .map((user) => (
//           <div
//             key={user}
//             onClick={() => setSelectedChat(user)}
//             className={`p-4 cursor-pointer transition ${
//               selectedChat === user
//                 ? "bg-cyan-500/20"
//                 : "hover:bg-white/5"
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 rounded-full bg-green-400" />
//               <span className="text-white">{user}</span>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }














export default function Sidebar({

  users,

  onlineUsers,

  userName,

  selectedChat,

  setSelectedChat,

  lastMessages,

  unread,


}) {



  function openChat(name){


    setSelectedChat(name);


  }







  return (


<div className="w-64 border-r border-white/10 bg-black/20 overflow-y-auto">





{/* HEADER */}

<div className="p-4 border-b border-white/10">


<h2 className="text-white font-bold tracking-wide">

Chats

</h2>


</div>









{/* GROUP CHAT */}


<div


onClick={()=>openChat("GROUP")}


className={

`
p-4 cursor-pointer transition

${

selectedChat==="GROUP"

?

"bg-cyan-500/20"

:

"hover:bg-white/5"

}

`

}


>


<div className="flex items-center gap-2">


<div className="text-lg">

🌎

</div>


<span className="text-white">

Group Chat

</span>


</div>


</div>











{/* USERS */}



{

users

.filter(

(user)=>

user.username !== userName

)

.map((user)=>{


const name=user.username;



return (



<div


key={name}


onClick={()=>openChat(name)}



className={

`
p-3 cursor-pointer transition border-b border-white/5


${

selectedChat===name

?

"bg-cyan-500/20"

:

"hover:bg-white/5"

}

`

}



>




<div className="flex items-center gap-3">







{/* STATUS DOT */}


<div


className={

`

w-2.5 h-2.5 rounded-full


${

user.online

?

"bg-green-400 shadow-[0_0_8px_#22c55e]"

:

"bg-gray-600"

}


`

}



/>







<div className="flex-1 min-w-0">





{/* USER NAME */}


<div className="flex items-center justify-between">


<span className="text-white text-sm">


{name}


</span>






{/* UNREAD BADGE */}



{

unread[name] > 0 &&


<div className="bg-cyan-400 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">


{unread[name]}


</div>


}





</div>








{/* LAST MESSAGE */}


<p className="text-[11px] text-gray-500 truncate">


{

lastMessages[name]

?

lastMessages[name]

:

user.online

?

"Online"

:

"Offline"

}



</p>




</div>



</div>



</div>



)


})


}




</div>


  );


}