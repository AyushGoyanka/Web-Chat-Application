import { useState } from "react";
import axios from "axios";

export default function Auth({
setUserName,
setProfile,
setShowNamePopup,
socket,
}) {

const [mode, setMode] = useState("login");

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [bio, setBio] = useState("");
const [avatar, setAvatar] = useState("");

function handleAvatar(e) {
const file = e.target.files[0];


if (!file) return;

const reader = new FileReader();

reader.onload = () => {
  setAvatar(reader.result);
};

reader.readAsDataURL(file);


}

async function submit(e) {
e.preventDefault();


try {
  const url =
    mode === "login"
      ? "http://localhost:4600/api/auth/login"
      : "http://localhost:4600/api/auth/register";

  const res = await axios.post(url, {
    username,
    email,
    password,
    bio,
    avatar,
  });

  const token = res.data.token;
  const user = res.data.user;

  // SAVE TOKEN
  localStorage.setItem("token", token);

  // SAVE USER PROFILE
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
} catch (err) {
  console.error(err);

  alert(
    err.response?.data?.message ||
    "Authentication Failed"
  );
}


}

return ( <div className="fixed inset-0 z-50 flex items-center justify-center">


  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

  <div className="relative z-10 w-[400px] glass-panel neon-border rounded-2xl p-8">

    <h2 className="text-white text-2xl font-bold text-center mb-2">
      {mode === "login"
        ? "Login"
        : "Create Account"}
    </h2>

    <p className="text-gray-500 text-xs text-center mb-6 uppercase tracking-widest">
      Nexus Chat
    </p>

    {mode === "register" && (
      <div className="flex justify-center mb-5">
        <label className="cursor-pointer">

          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover border border-cyan-400"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-3xl text-white">
              +
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatar}
          />

        </label>
      </div>
    )}

    <form onSubmit={submit}>

      {mode === "register" && (
        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
        />
      )}

      {mode === "register" && (
        <textarea
          placeholder="Bio"
          rows="3"
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full mb-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
      />

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold uppercase tracking-widest"
      >
        {mode === "login"
          ? "LOGIN"
          : "REGISTER"}
      </button>

    </form>

    <p
      className="text-center text-gray-400 mt-5 cursor-pointer hover:text-white transition"
      onClick={() =>
        setMode(
          mode === "login"
            ? "register"
            : "login"
        )
      }
    >
      {mode === "login"
        ? "Create new account"
        : "Already have an account?"}
    </p>

  </div>
</div>


);
}
