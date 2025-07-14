import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";
import cors from "cors"

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

//access dotenv content
dotenv.config();

//express middlewares

// Increase payload size limit to 10MB (for profileImage)
app.use(express.json({limit: "3mb"}))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//custom middlewares
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
    connectDB();
});