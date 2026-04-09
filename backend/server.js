import express from "express";
import mongoose from "mongoose";

const PORT = 9999;
const DB_URL = "mongodb://127.0.0.1:27017/beginner";
const app = express();

mongoose.connect(DB_URL)
    .then(() => console("MongoDB connected"))
    .catch((e) => console.log("MongoDB Error encountered"));

app.get("/", (req, res) => {
    res.send("this is root");
})

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));