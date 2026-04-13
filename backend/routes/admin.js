import { Router } from "express";
import { UserAuthentication } from "../middlewares/authenticate.js";
import { AdminOnly } from "../middlewares/authorize.js";
import {
    handleAllUserDisplay,
    handleUserCreation,
    handleUserUpdate,
    handleUserDeletion
} from "../controllers/admin.js";

const adminRouter = Router();

adminRouter
    .get("/user", UserAuthentication, AdminOnly, handleAllUserDisplay)
    .post("/user", UserAuthentication, AdminOnly, handleUserCreation)
    .patch("/user/:id", UserAuthentication, AdminOnly, handleUserUpdate)
    .delete("/user/:id", UserAuthentication, AdminOnly, handleUserDeletion);

export default adminRouter;