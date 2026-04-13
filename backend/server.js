import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config("");
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";

const PORT = process.env.PORT;
console.log(PORT)
const DB_URL = process.env.DB_URL;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log("MongoDB Error encountered"));

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT)
});