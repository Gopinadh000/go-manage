import projectsRoutes from "./projects.routes.js"
import express from "express"
import { ReS } from "../../utils/Res.utils.js";
import authRoutes from "./auth.routes.js";
import usersRoutes from "./users.routes.js"
import {cookieTokenAuth } from ".././../middlewares/jwt/jwtToken.js"


const router = express.Router()


//test route
router.get("/test",  cookieTokenAuth ,(req,res)=> {

    ReS(res, {
        status: true,
        statusCode: 200,
        statusMessage: "Test Api is working",
    })
})

//app routes 
router.use("/auth", authRoutes);
router.use("/projects",  cookieTokenAuth ,  projectsRoutes);

router.use("/users" , cookieTokenAuth,  usersRoutes )


export { router  }  