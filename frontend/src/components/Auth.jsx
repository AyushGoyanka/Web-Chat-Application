import { useState } from "react";
import axios from "axios";

export default function Auth({
  setUserName,
  setProfile,
  setShowNamePopup,
  socket,
}) {

  const [mode,setMode] = useState("login");

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [bio,setBio] = useState("");

  const [avatar,setAvatar] = useState("");



  function handleAvatar(e){

    const file=e.target.files[0];

    if(!file) return;


    const reader=new FileReader();


    reader.onload=()=>{

      setAvatar(reader.result);

    };


    reader.readAsDataURL(file);

  }




  async function submit(e){

    e.preventDefault();


    try{


      let url =
      mode==="login"
      ?
      "http://localhost:4600/api/auth/login"
      :
      "http://localhost:4600/api/auth/register";



      const res = await axios.post(url,{

        username,
        email,
        password,
        bio,
        avatar

      });



      const user=res.data.user;



      localStorage.setItem(
        "profile",
        JSON.stringify(user)
      );


      localStorage.setItem(
        "username",
        user.username
      );



      setUserName(user.username);

      setProfile(user);




      socket.current.emit(
        "joinRoom",
        user
      );


      setShowNamePopup(false);



    }
    catch(err){

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Authentication Failed"
      );

    }


  }



return (

<div className="fixed inset-0 z-50 flex items-center justify-center">


<div className="absolute inset-0 bg-black/80"/>



<div className="relative z-10 w-[380px] glass-panel neon-border rounded-2xl p-8">


<h2 className="text-white text-2xl font-bold text-center mb-5">

{
mode==="login"
?
"Login"
:
"Create Account"
}

</h2>



{
mode==="register" &&

<div className="flex justify-center mb-4">

<label className="cursor-pointer">

{
avatar ?

<img
src={avatar}
className="w-20 h-20 rounded-full object-cover"
/>

:

<div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center text-3xl">

+

</div>

}


<input
type="file"
accept="image/*"
hidden
onChange={handleAvatar}
/>


</label>


</div>

}




<form onSubmit={submit}>


<input

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 text-white"

/>




{
mode==="register" &&

<textarea

placeholder="Bio"

value={bio}

onChange={(e)=>setBio(e.target.value)}

className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 text-white"

/>

}





<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 text-white"

/>




<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="w-full mb-5 px-4 py-3 rounded-xl bg-white/5 text-white"

/>



<button className="w-full py-3 bg-cyan-500 rounded-xl font-bold">

{
mode==="login"
?
"LOGIN"
:
"REGISTER"
}


</button>


</form>



<p
className="text-gray-400 text-center mt-4 cursor-pointer"
onClick={()=>setMode(
mode==="login"
?
"register"
:
"login"
)}
>


{
mode==="login"
?
"Create new account"
:
"Already have account?"
}


</p>



</div>


</div>

);

}