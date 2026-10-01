import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@as-integrations/express5";
import grapghQLServer from "./graph-QL/index.js";
import { cookieTokenAuth } from "./middlewares/jwt/jwtToken.js";


import { router as v1Routes } from "./routes/v1-routes/v1.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

await grapghQLServer.start()
app.use(cors({
    origin : "http://localhost:4001",
    credentials: true,
    // methods : "GET , POST, PUT, DELETE, PATCH",
    // allowedHeaders : 'Content-Type , Accepts , Authorization'
}));

app.use("/api/v1", v1Routes);
app.use('/graphql', cookieTokenAuth,   expressMiddleware(grapghQLServer, {
        context: async ({ req }) => {
            const { tenantId , tenantPublicId , userPublicId , userRoleId , userId } = req

            return {
                tenantId ,
                tenantPublicId , 
                userPublicId , 
                userRoleId ,
                userId
            };
        }
    }))

export default app;