import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { connectWS } from "./ws";

import Chat from "./components/Chat";
import NamePopup from "./components/NamePopup";

export default function App() {
const socket = useRef(null);

const [userName, setUserName] = useState("");
const [showNamePopup, setShowNamePopup] = useState(true);

const [profile, setProfile] = useState({
username: "",
bio: "",
avatar: "",
});

const [groupMessages, setGroupMessages] = useState([]);
const [privateMessages, setPrivateMessages] = useState({});

const [users, setUsers] = useState([]);

const [selectedChat, setSelectedChat] = useState("GROUP");

const [lastMessages, setLastMessages] = useState({});
const [unread, setUnread] = useState({});

const [typingUser, setTypingUser] = useState("");

// SOCKET CONNECT
useEffect(() => {
socket.current = connectWS();


const socketInstance = socket.current;

socketInstance.on("chatMessage", (msg) => {
  setGroupMessages((prev) => [...prev, msg]);
});

socketInstance.on("privateMessage", (msg) => {
  setPrivateMessages((prev) => ({
    ...prev,
    [msg.partner]: [...(prev[msg.partner] || []), msg],
  }));

  setLastMessages((prev) => ({
    ...prev,
    [msg.partner]: msg.text,
  }));

  setUnread((prev) => ({
    ...prev,
    [msg.partner]:
      selectedChat === msg.partner
        ? 0
        : (prev[msg.partner] || 0) + 1,
  }));
});

socketInstance.on("userStatus", (data) => {
  setUsers(data);
});

socketInstance.on("userOffline", (name) => {
  setUsers((prev) =>
    prev.map((user) =>
      user.username === name
        ? {
            ...user,
            online: false,
          }
        : user
    )
  );
});

socketInstance.on("privateTyping", (name) => {
  setTypingUser(name);
});

socketInstance.on("stopPrivateTyping", () => {
  setTypingUser("");
});

socketInstance.on("usernameTaken", () => {
  alert("Username already taken");
  setShowNamePopup(true);
});

return () => {
  socketInstance.disconnect();
};


}, []);

// AUTO LOGIN + PROFILE RESTORE
useEffect(() => {
const savedProfile =
localStorage.getItem("profile");


if (!savedProfile) return;

const parsedProfile =
  JSON.parse(savedProfile);

setProfile(parsedProfile);
setUserName(parsedProfile.username);
setShowNamePopup(false);

setTimeout(() => {
  if (socket.current) {
    socket.current.emit(
      "joinRoom",
      parsedProfile
    );
  }
}, 500);


}, []);

// LOAD OLD MESSAGES
useEffect(() => {
async function loadMessages() {
try {
const username =
localStorage.getItem("username");


    if (!username) return;

    const res = await axios.get(
      `http://localhost:4600/api/messages/${username}`
    );

    const group = res.data.filter(
      (msg) => msg.receiver === "GROUP"
    );

    setGroupMessages(group);
  } catch (error) {
    console.error(
      "Load Messages Error:",
      error
    );
  }
}

loadMessages();


}, []);

// CLEAR UNREAD
useEffect(() => {
if (selectedChat !== "GROUP") {
setUnread((prev) => ({
...prev,
[selectedChat]: 0,
}));
}
}, [selectedChat]);

const currentMessages =
selectedChat === "GROUP"
? groupMessages
: privateMessages[selectedChat] || [];

return (
<>
{showNamePopup && ( <NamePopup
       socket={socket}
       setUserName={setUserName}
       setProfile={setProfile}
       setShowNamePopup={setShowNamePopup}
     />
)}

  {!showNamePopup && (
    <Chat
      socket={socket}
      userName={userName}
      profile={profile}
      messages={currentMessages}
      users={users}
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
      typers={
        typingUser ? [typingUser] : []
      }
      lastMessages={lastMessages}
      unread={unread}
      setUnread={setUnread}
    />
  )}
</>


);
}
