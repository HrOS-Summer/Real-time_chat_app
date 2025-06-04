import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";

import authRoute from "./routes/auth.route.js";

const app = express();

//access dotenv content
dotenv.config();

//express middlewares
app.use(express.json())
app.use(cookieParser());

//custom middlewares
app.use("/api/auth", authRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
    connectDB();
});