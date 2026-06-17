import { useEffect, useRef, useState } from "react";
import { connectWS } from "./ws";

import Chat from "./components/Chat";
import NamePopup from "./components/NamePopup";


export default function App(){


    const socket = useRef(null);



    const [userName,setUserName] = useState("");

    const [showNamePopup,setShowNamePopup] = useState(true);




    // PROFILE

    const [profile,setProfile] = useState({

        username:"",

        bio:"",

        avatar:""

    });






    // MESSAGES

    const [groupMessages,setGroupMessages] = useState([]);

    const [privateMessages,setPrivateMessages] = useState({});







    // USERS

    const [users,setUsers] = useState([]);





    // CHAT

    const [selectedChat,setSelectedChat] = useState("GROUP");






    // SIDEBAR DATA

    const [lastMessages,setLastMessages] = useState({});

    const [unread,setUnread] = useState({});






    // TYPING

    const [typingUser,setTypingUser] = useState("");









    useEffect(()=>{


        socket.current = connectWS();


        const socketInstance = socket.current;







        // GROUP MESSAGE


        socketInstance.on(
            "chatMessage",
            (msg)=>{


                setGroupMessages(prev=>[

                    ...prev,

                    msg

                ]);


            }
        );









        // PRIVATE MESSAGE


        socketInstance.on(
            "privateMessage",
            (msg)=>{


                setPrivateMessages(prev=>({


                    ...prev,


                    [msg.partner]:[

                        ...(prev[msg.partner] || []),

                        msg

                    ]


                }));





                setLastMessages(prev=>({


                    ...prev,


                    [msg.partner]:msg.text


                }));




                setUnread(prev=>({


                    ...prev,


                    [msg.partner]:

                    selectedChat===msg.partner

                    ?

                    0

                    :

                    (prev[msg.partner] || 0)+1



                }));


            }
        );









        // USERS


        socketInstance.on(
            "userStatus",
            (data)=>{


                setUsers(data);


            }
        );








        socketInstance.on(
            "userOffline",
            (name)=>{


                setUsers(prev=>

                    prev.map(user=>

                        user.username===name

                        ?

                        {

                            ...user,

                            online:false

                        }

                        :

                        user


                    )

                );


            }
        );









        // TYPING


        socketInstance.on(
            "privateTyping",
            (name)=>{


                setTypingUser(name);


            }
        );





        socketInstance.on(
            "stopPrivateTyping",
            ()=>{


                setTypingUser("");


            }
        );









        socketInstance.on(
            "usernameTaken",
            ()=>{


                alert(
                    "Username already taken"
                );


                setShowNamePopup(true);


            }
        );








        return ()=>{


            socketInstance.off("chatMessage");

            socketInstance.off("privateMessage");

            socketInstance.off("userStatus");

            socketInstance.off("userOffline");

            socketInstance.off("privateTyping");

            socketInstance.off("stopPrivateTyping");

            socketInstance.off("usernameTaken");


            socketInstance.disconnect();


        };



    },[]);









    // CLEAR UNREAD


    useEffect(()=>{


        if(selectedChat!=="GROUP"){


            setUnread(prev=>({


                ...prev,


                [selectedChat]:0


            }));


        }


    },[selectedChat]);









    const currentMessages =

    selectedChat==="GROUP"

    ?

    groupMessages

    :

    privateMessages[selectedChat] || [];









    return (

        <>


        {
            showNamePopup &&


            <NamePopup


                socket={socket}


                setUserName={setUserName}


                setProfile={setProfile}


                setShowNamePopup={setShowNamePopup}


            />

        }









        {

            !showNamePopup &&



            <Chat



                socket={socket}



                userName={userName}



                profile={profile}



                messages={currentMessages}




                users={users}




                selectedChat={selectedChat}



                setSelectedChat={setSelectedChat}




                typers={

                    typingUser

                    ?

                    [typingUser]

                    :

                    []

                }




                lastMessages={lastMessages}



                unread={unread}



                setUnread={setUnread}



            />


        }



        </>


    );


}