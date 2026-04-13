import { Router } from "express";
import { UserAuthentication } from "../middlewares/authenticate.js";
import { AdminOnly } from "../middlewares/authorize.js";

const adminRouter = Router();

adminRouter
    .get("/", UserAuthentication, AdminOnly, (req, res) => {
        return res.send("this is the Admin API that we will soon implement");
    })

export default adminRouter;