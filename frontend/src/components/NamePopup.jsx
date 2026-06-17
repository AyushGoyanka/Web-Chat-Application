import { useState } from "react";


export default function NamePopup({

    setUserName,

    setProfile,

    setShowNamePopup,

    socket


}) {



    const [username,setUsername]=useState("");

    const [bio,setBio]=useState("");

    const [avatar,setAvatar]=useState("");







    function handleAvatar(e){


        const file=e.target.files[0];


        if(!file) return;



        const reader=new FileReader();



        reader.onload=()=>{


            setAvatar(reader.result);


        };



        reader.readAsDataURL(file);



    }








    function handleSubmit(e){


        e.preventDefault();



        if(!username.trim()) return;






        const profile={


            username:username.trim(),


            bio:bio.trim(),


            avatar


        };







        socket.current.emit(

            "joinRoom",

            profile

        );







        setUserName(

            username.trim()

        );





        setProfile(profile);




        setShowNamePopup(false);





    }








    return (



<div className="fixed inset-0 z-50 flex items-center justify-center">



<div className="absolute inset-0 bg-black/80 backdrop-blur-sm"/>







<div className="relative z-10 w-[380px] glass-panel neon-border rounded-2xl p-8">





<h2 className="text-white text-2xl font-bold text-center mb-2">

Create Profile

</h2>



<p className="text-gray-500 text-xs text-center mb-6 uppercase tracking-widest">

Join Nexus Chat

</p>










{/* Avatar */}



<div className="flex justify-center mb-5">


<label className="cursor-pointer">


{

avatar

?


<img

src={avatar}

className="w-20 h-20 rounded-full object-cover border border-cyan-400"

/>


:


<div className="w-20 h-20 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-3xl">

+

</div>



}



<input

type="file"

accept="image/*"

className="hidden"

onChange={handleAvatar}


/>



</label>



</div>









<form onSubmit={handleSubmit}>


<input


value={username}


onChange={(e)=>setUsername(e.target.value)}


placeholder="Username"


className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"


/>








<textarea


value={bio}


onChange={(e)=>setBio(e.target.value)}


placeholder="Bio"


rows="3"


className="w-full mb-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none"


/>









<button


className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold uppercase tracking-widest"


>


Initialize →


</button>






</form>






</div>





</div>



    );


}