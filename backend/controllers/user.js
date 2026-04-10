import User from "../models/user.js";

export async function handleUserRegister() {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            })
        }
        const createdUser = await User.create({ name, email, password });
        return res.status(200).json({
            status: "success",
            createdUser
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message || "Internal server error",
        })
    }
}

export async function handleUserLogin() {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "All fields are required",
        })
    }

    try {
        const foundUser = await User.findOne({ email, password });
        if (foundUser === null) {
            return res.status(404).json({
                staus: "fail",
                message: "User not found",
            })
        }
        return res.status(200).json({
            status: "success",
            data: foundUser,
        })
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        })
    }
}