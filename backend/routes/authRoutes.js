import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


const router = express.Router();


const SECRET = "NEXUS_SECRET_KEY";




// REGISTER

router.post("/register", async (req, res) => {

    try {


        const {
            username,
            email,
            password,
            bio,
            avatar
        } = req.body;



        const existingUser = await User.findOne({
            email
        });



        if(existingUser){

            return res.status(400).json({
                message:"User already exists"
            });

        }




        const hashedPassword = await bcrypt.hash(
            password,
            10
        );




        const user = await User.create({

            username,

            email,

            password: hashedPassword,

            bio,

            avatar

        });






        const token = jwt.sign(

            {
                id:user._id,
                username:user.username
            },

            SECRET,

            {
                expiresIn:"7d"
            }

        );






        res.json({

            token,


            user:{

                username:user.username,

                email:user.email,

                bio:user.bio,

                avatar:user.avatar

            }

        });



    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


});









// LOGIN


router.post("/login", async(req,res)=>{


    try{


        const {
            email,
            password
        } = req.body;





        const user = await User.findOne({

            email

        });





        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }





        const validPassword = await bcrypt.compare(

            password,

            user.password

        );





        if(!validPassword){


            return res.status(400).json({

                message:"Invalid password"

            });


        }






        const token = jwt.sign(

            {
                id:user._id,
                username:user.username
            },

            SECRET,

            {
                expiresIn:"7d"
            }

        );







        res.json({

            token,


            user:{


                username:user.username,

                email:user.email,

                bio:user.bio,

                avatar:user.avatar


            }


        });





    }


    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});


export default router;