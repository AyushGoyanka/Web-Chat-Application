import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";


const app = express();

const server = createServer(app);



const io = new Server(server,{

    cors:{
        origin:"*"
    }

});





const ROOM="group";




// username -> socket id
const users={};


// socket id -> profile
const socketUsers={};







io.on("connection",(socket)=>{


    console.log("Connected:",socket.id);








    // JOIN USER WITH PROFILE


    socket.on(
        "joinRoom",
        (profile)=>{


            const {
                username,
                bio,
                avatar
            } = profile;



            if(!username?.trim()) return;




            if(users[username]){


                socket.emit(
                    "usernameTaken"
                );


                return;

            }







            users[username]=socket.id;



            socketUsers[socket.id]={

                username,

                bio,

                avatar

            };







            socket.join(ROOM);








            // SEND ONLINE USERS


            io.emit(

                "userStatus",

                Object.values(socketUsers)

                .map(user=>({

                    ...user,

                    online:true

                }))


            );









            socket.to(ROOM).emit(

                "roomNotice",

                `${username} joined`

            );




        }

    );













    // GROUP MESSAGE


    socket.on(

        "chatMessage",

        (msg)=>{


            const sender =
            socketUsers[socket.id];



            const message={

                ...msg,


                avatar:
                sender?.avatar || null,


                bio:
                sender?.bio || ""

            };





            io.in(ROOM).emit(

                "chatMessage",

                message

            );



        }

    );












    // PRIVATE MESSAGE



    socket.on(

        "privateMessage",

        ({sender,receiver,text})=>{





            const senderData =
            socketUsers[socket.id];





            const message={


                id:Date.now(),


                sender,


                text,


                ts:Date.now(),


                avatar:
                senderData?.avatar || null,


                bio:
                senderData?.bio || "",


                private:true


            };









            const receiverSocket =
            users[receiver];








            // receiver


            if(receiverSocket){


                io.to(receiverSocket)

                .emit(

                    "privateMessage",

                    {

                        ...message,

                        partner:sender

                    }

                );


            }









            // sender


            socket.emit(

                "privateMessage",

                {

                    ...message,

                    partner:receiver

                }

            );





        }

    );














    // TYPING


    socket.on(

        "privateTyping",

        ({sender,receiver})=>{



            const receiverSocket =
            users[receiver];



            if(receiverSocket){


                io.to(receiverSocket)

                .emit(

                    "privateTyping",

                    sender

                );


            }


        }

    );








    socket.on(

        "stopPrivateTyping",

        ({sender,receiver})=>{



            const receiverSocket =
            users[receiver];



            if(receiverSocket){


                io.to(receiverSocket)

                .emit(

                    "stopPrivateTyping",

                    sender

                );


            }


        }

    );












    // DISCONNECT



    socket.on(

        "disconnect",

        ()=>{


            const profile =
            socketUsers[socket.id];



            if(profile){



                delete users[profile.username];

                delete socketUsers[socket.id];





                io.emit(

                    "userOffline",

                    profile.username

                );






                io.emit(

                    "userStatus",

                    Object.values(socketUsers)

                    .map(user=>({

                        ...user,

                        online:true

                    }))

                );




            }






            console.log(

                "Disconnected:",

                socket.id

            );




        }

    );



});









app.get("/",(req,res)=>{


    res.send(

        "Server Running"

    );


});








server.listen(

    4600,

    ()=>{


        console.log(

            "Server running on http://localhost:4600"

        );


    }

);