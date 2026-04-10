import { Router } from "express";
import { handleUserRegister, handleUserLogin } from "../controllers/user.js"

const userRouter = Router();

userRouter
    .post("/register", handleUserRegister)
    .post("/login", handleUserLogin);

export default userRouter;