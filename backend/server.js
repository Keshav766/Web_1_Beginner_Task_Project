import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config("./.env");
import User from "./models/user.js";

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

app.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const createdUser = await User.create({ name, email, password });
    res.json({
        status: "success",
        data: createdUser,
    })
})

app.listen(PORT, () => {
    console.log("Server starte on ", PORT)
});