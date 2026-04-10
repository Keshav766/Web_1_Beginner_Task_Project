import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config("./.env");

const PORT = process.env.PORT;
console.log(PORT)
const DB_URL = process.env.DB_URL;
const app = express();

app.use(cors());
app.use(express.json());

const db = mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log("MongoDB Error encountered"));


app.get("/", async (req, res) => {
    res.send("this is root");
})

app.listen(PORT, () => {
    console.log("Server starte on ", PORT)
});