export default function Sidebar({

users,

userName,

profile,

selectedChat,

setSelectedChat,

lastMessages,

unread,

logout


}) {


function openChat(name) {

    setSelectedChat(name);

}

return (

    <div className="w-72 border-r border-white/10 bg-black/20 overflow-y-auto flex flex-col">

        {/* PROFILE SECTION */}

        <div className="p-4 border-b border-white/10">

            <div className="flex items-center gap-3">

                {
                    profile?.avatar
                    ?
                    <img
                        src={profile.avatar}
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover border border-cyan-400"
                    />
                    :
                    <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-black font-bold">
                        {userName?.[0]?.toUpperCase()}
                    </div>
                }

                <div className="flex-1 min-w-0">

                    <p className="text-white font-semibold truncate">
                        {userName}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                        {profile?.bio || "Nexus User"}
                    </p>

                </div>

            </div>

            <button
                onClick={logout}
                className="w-full mt-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
            >
                Logout
            </button>

        </div>

        {/* HEADER */}

        <div className="p-4 border-b border-white/10">

            <h2 className="text-white font-bold tracking-wide">
                Chats
            </h2>

        </div>

        {/* GROUP CHAT */}

        <div
            onClick={() => openChat("GROUP")}
            className={`
                p-4 cursor-pointer transition
                ${
                    selectedChat === "GROUP"
                    ?
                    "bg-cyan-500/20"
                    :
                    "hover:bg-white/5"
                }
            `}
        >

            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                    🌎
                </div>

                <div>

                    <p className="text-white text-sm font-semibold">
                        Group Chat
                    </p>

                    <p className="text-xs text-gray-500">
                        Live Room
                    </p>

                </div>

            </div>

        </div>

        {/* USERS */}

        {
            users
            .filter(
                user => user.username !== userName
            )
            .map((user) => (

                <div
                    key={user.username}
                    onClick={() => openChat(user.username)}
                    className={`
                        p-3 border-b border-white/5 cursor-pointer transition
                        ${
                            selectedChat === user.username
                            ?
                            "bg-cyan-500/20"
                            :
                            "hover:bg-white/5"
                        }
                    `}
                >

                    <div className="flex gap-3 items-center">

                        <div className="relative">

                            {
                                user.avatar
                                ?
                                <img
                                    src={user.avatar}
                                    className="w-11 h-11 rounded-full object-cover border border-cyan-400/30"
                                />
                                :
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center text-black font-bold">
                                    {user.username[0].toUpperCase()}
                                </div>
                            }

                            <div
                                className={`
                                    absolute bottom-0 right-0 w-3 h-3 rounded-full border border-black
                                    ${
                                        user.online
                                        ?
                                        "bg-green-400"
                                        :
                                        "bg-gray-500"
                                    }
                                `}
                            />

                        </div>

                        <div className="flex-1 min-w-0">

                            <div className="flex justify-between items-center">

                                <span className="text-white text-sm font-medium">
                                    {user.username}
                                </span>

                                {
                                    unread[user.username] > 0 &&
                                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-black text-[10px] font-bold flex items-center justify-center">
                                        {unread[user.username]}
                                    </div>
                                }

                            </div>

                            <p className="text-xs text-gray-500 truncate">

                                {
                                    user.bio
                                    ?
                                    user.bio
                                    :
                                    lastMessages[user.username]
                                    ?
                                    lastMessages[user.username]
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

            ))
        }

    </div>

);


}
