import { useState, useRef, useEffect } from "react";

import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Sidebar from "./Sidebar";

export default function Chat({

socket,

userName,

profile,

messages,

users,

selectedChat,

setSelectedChat,

typers,

lastMessages,

unread,

setUnread,

logout

}) {

const [text, setText] = useState("");

const timer = useRef(null);

function sendMessage() {


const value = text.trim();

if (!value) return;

const msg = {

  id: Date.now(),

  sender: userName,

  text: value,

  ts: Date.now()

};

if (selectedChat === "GROUP") {

  socket.current.emit(
    "chatMessage",
    msg
  );

} else {

  socket.current.emit(
    "privateMessage",
    {
      sender: userName,
      receiver: selectedChat,
      text: value
    }
  );

  setUnread(prev => ({
    ...prev,
    [selectedChat]: 0
  }));
}

setText("");


}

function handleKeyDown(e) {


if (e.key === "Enter" && !e.shiftKey) {

  e.preventDefault();

  sendMessage();

}


}

useEffect(() => {

if (selectedChat === "GROUP")
  return;

if (text.trim()) {

  socket.current.emit(
    "privateTyping",
    {
      sender: userName,
      receiver: selectedChat
    }
  );

  clearTimeout(timer.current);

  timer.current = setTimeout(() => {

    socket.current.emit(
      "stopPrivateTyping",
      {
        sender: userName,
        receiver: selectedChat
      }
    );

  }, 1000);

} else {

  socket.current.emit(
    "stopPrivateTyping",
    {
      sender: userName,
      receiver: selectedChat
    }
  );

}

return () => clearTimeout(timer.current);


}, [text, selectedChat, userName]);

return (

<div className="relative h-screen flex items-center justify-center overflow-hidden">

  <div className="mesh-bg" />

  <div className="grid-overlay" />

  <div className="scanline" />

  <div className="relative z-10 w-full max-w-6xl h-[88vh] mx-4 glass-panel neon-border rounded-2xl overflow-hidden">

    <div className="flex h-full">

      <Sidebar

        users={users}

        userName={userName}

        profile={profile}

        selectedChat={selectedChat}

        setSelectedChat={setSelectedChat}

        lastMessages={lastMessages}

        unread={unread}

        logout={logout}

      />

      <div className="flex-1 flex flex-col">

        <Header

          userName={userName}

          profile={profile}

          selectedChat={selectedChat}

          users={users}

          typers={typers}

        />

        <MessageList

          messages={messages || []}

          userName={userName}

        />

        <MessageInput

          text={text}

          setText={setText}

          sendMessage={sendMessage}

          handleKeyDown={handleKeyDown}

        />

      </div>

    </div>

  </div>

</div>

);

}
