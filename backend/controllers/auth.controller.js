import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

import User from "../models/user.model.js"

import errorUtil from "../utils/error.util.js";
import tokenUtil from "../utils/token.util.js";

class authController {
    static register = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return next(errorUtil.generateError(400, 'Vui lòng nhập đầy đủ thông tin'));
            }

            const user = await User.findOne({ email });
            if (user) {
                return next(errorUtil.generateError(401, 'User đã tồn tại!'));
            };

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.create({
                username,
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "Signup successful"
            })
        } catch (error) {
            next(error);
        }
    }

    static login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(errorUtil.generateError(400, 'All fields are required'));
            }

            const user = await User.findOne({ email });
            if (!user) {
                return next(errorUtil.generateError(404, 'User not found'));
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                return next(errorUtil.generateError(400, 'Invalid password'));
            }

            const token = await tokenUtil.generateToken(user)

            const { password: pass, ...rest } = user._doc;

            res.cookie('access_token', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })

            return res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    }

    static google = async (req, res, next) => {
        try {
            const { email, name, googlePhotoUrl } = req.body;

            const user = await User.findOne({ email });

            if (user) {
                const token = await tokenUtil.generateToken(user)

                const { password, ...rest } = user._doc;

                res.cookie('access_token', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })

                return res.status(200).json(rest);
            } else {
                const generatedPassword =
                    Math.random().toString(36).slice(-8) +
                    Math.random().toString(36).slice(-8);

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(generatedPassword, salt);

                const user = await User.create({
                    username:
                        name.toLowerCase().split(' ').join('') +
                        Math.random().toString(9).slice(-4),
                    email,
                    password: hashedPassword,
                    profilePicture: googlePhotoUrl,
                });

                const token = await tokenUtil.generateToken(user)

                const { password, ...rest } = user._doc;

                res.cookie('access_token', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })

                return res.status(200).json(rest);
            }
        } catch (error) {
            next(error);
        }
    }

    static logout = async (req, res, next) => {
        try {
            res.cookie('access_token', null, {
                expires: new Date(Date.now()),
                httpOnly: true
            })

            return res.status(200).json({
                message: 'User has been signed out'
            })
        } catch (error) {
            next(error);
        }
    }
}

export default authController