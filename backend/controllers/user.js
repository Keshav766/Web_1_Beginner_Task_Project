import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function handleUserRegister(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email already exists"
            });
        }
        const imagePath = req.file ? req.file.path : null;
        const hashedPass = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            name,
            email,
            password: hashedPass,
            profileImage: imagePath
        });
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
        const token = jwt.sign(
            { userId: foundUser._id, role: foundUser.role },
            process.env.JWT_Secret,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            status: "success",
            token,
            data: safeUser,
        });

    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        });
    }
}

export async function handleUserProfileDisplay(req, res) {
    try {
        const foundUser = await User.findById(req.user.userId);
        if (!foundUser) {
            return res.status(404).json({
                status: "fail",
                message: "user data not found",
            })
        }
        const { password: _, ...safeUser } = foundUser.toObject();
        return res.status(200).json({
            status: "success",
            data: safeUser,
        })
    } catch (e) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        })
    }
}

export async function handleUserUpdate(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            req.body,
            { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }
        const { password: _, ...safeUser } = updatedUser.toObject();
        return res.status(200).json({
            staus: "success",
            data: safeUser,
        })
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        })
    }
}

export async function handleUserDelete(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.userId);
        if (!deletedUser) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        })
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
        })
    }
}