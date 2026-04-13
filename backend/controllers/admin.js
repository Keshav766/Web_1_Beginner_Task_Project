import User from "../models/user.js";
import bcrypt from "bcrypt";

export async function handleAllUserDisplay(req, res) {
    try {
        const users = await User.find({});
        return res.status(200).json({
            status: "success",
            data: users,
        })
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server error"
        })
    }
}

export async function handleUserCreation(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email already exists"
            })
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ name, email, password: hashedPass, role });
        return res.status(201).json({
            status: "success",
            message: "User successfully created",
            data: createdUser,
        })

    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}

export async function handleUserUpdate(req, res) {
    try {
        const userId = req.params.id;
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                status: "fail",
                message: `User with Id ${userId} not found`
            })
        }
        return res.status(200).json({
            status: "success",
            message: `User with Id ${userId} successfully updated`,
            data: updatedUser
        })
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server message"
        })
    }
}

export async function handleUserDeletion(req, res) {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({
                status: "fail",
                message: `User with ${userId} not found`
            })
        }
        return res.status(200).json({
            status: "success",
            message: `User with ${userId} sucessfully deleted`,
            data: deletedUser
        })
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server message"
        })
    }
}