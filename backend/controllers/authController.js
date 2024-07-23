import bcrypt from "bcryptjs"

import USERS from "../models/usersModel.js"

import { generateToken } from "../utils/tokenUtil.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await USERS.findOne({ email });

        if (!name || !email || !password) {
            throw new Error("Vui lòng nhập đầy đủ thông tin!");
        }

        if (user) {
            throw new Error("User đã được đăng ký!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await USERS.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = await generateToken(newUser)

        return res.status(201).json({
            _id: newUser._id,
            avatar: newUser.avatar,
            name: newUser.name,
            email: newUser.email,
            verified: newUser.verified,
            admin: newUser.admin,
            token: token
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Vui lòng nhập đầy đủ thông tin!");
        }

        const user = await USERS.findOne({ email });

        if (!user) {
            throw new Error("User không tồn tại!");
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (!isCorrectPassword) {
            throw new Error("Email và mật khẩu không hợp lệ!");
        }

        const token = await generateToken(user)

        return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: token,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}