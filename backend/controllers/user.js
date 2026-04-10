import User from "../models/user.js";
import bcrypt from "bcrypt";

export async function handleUserRegister(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            })
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ name, email, password: hashedPass });
        const { password: _, ...safeUser } = createdUser.toObject();
        return res.status(201).json({
            status: "success",
            data: safeUser,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message || "Internal server error",
        })
    }
}

export async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "All fields are required",
        });
    }

    try {
        const foundUser = await User.findOne({ email });

        const isMatch = foundUser
            ? await bcrypt.compare(password, foundUser.password)
            : false;

        if (!foundUser || !isMatch) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid credentials",
            });
        }

        const { password: _, ...safeUser } = foundUser.toObject();

        return res.status(200).json({
            status: "success",
            data: safeUser,
        });

    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        });
    }
}