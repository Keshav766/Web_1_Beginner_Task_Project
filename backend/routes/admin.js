import { Router } from "express";
import { UserAuthentication } from "../middlewares/auth.js";

const adminRouter = Router();

adminRouter
    .get("/", UserAuthentication, (req, res) => {
        return res.send("this is the Admin API that we will soon implement");
    })

export default adminRouter;