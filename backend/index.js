import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import "./configs/dotenvConfig.js"

import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import postRoute from "./routes/postRoute.js"
import commentRoute from "./routes/commentRoute.js"
import categoryRoute from "./routes/categoryRoute.js"

import {
    invalidPathHandler,
    errorResponserHandler
} from "./middlewares/errorHandlerMiddleware.js"

import { connectDB } from "./services/dbService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 8080

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/category", categoryRoute);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});