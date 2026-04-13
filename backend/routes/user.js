import { Router } from "express";
import {
    handleUserRegister,
    handleUserLogin,
    handleUserProfileDisplay,
    handleUserUpdate,
    handleUserDelete
} from "../controllers/user.js"
import { UserAuthentication } from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter
    .post("/register", handleUserRegister)
    .post("/login", handleUserLogin)
    .get("/profile", UserAuthentication, handleUserProfileDisplay)
    .patch("/update", UserAuthentication, handleUserUpdate)
    .delete("/delete", UserAuthentication, handleUserDelete);

export default userRouter;