import { Router } from "express";
import {
    handleUserRegister,
    handleUserLogin,
    handleUserProfileDisplay,
    handleUserUpdate,
    handleUserDelete
} from "../controllers/user.js"
import { UserAuthentication } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter
    .post("/register", upload.single("profileImage"), handleUserRegister)
    .post("/login", handleUserLogin)
    .get("/profile", UserAuthentication, handleUserProfileDisplay)
    .patch("/update", UserAuthentication, handleUserUpdate)
    .delete("/delete", UserAuthentication, handleUserDelete);

export default userRouter;