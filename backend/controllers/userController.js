import bcrypt from "bcryptjs"

import { uploadPicture } from "../configs/multerConfig.js";

import USERS from "../models/usersModel.js"
import POSTS from "../models/postsModel.js"

import { generateToken } from "../utils/tokenUtil.js";
import { deleteFile } from "../utils/fileUtil.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await USERS.findById(req.user._id);

        if (!user) {
            let error = new Error("User không tồn tại!");

            error.statusCode = 404;
            next(error);
        }

        return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateProfileById = async (req, res, next) => {
    try {
        const userIdToUpdate = req.params.userId;

        const userId = req.user.id;

        if (!req.user.admin && userId !== userIdToUpdate) {
            let error = new Error("Hành động không hợp lệ!");

            error.statusCode = 403;
            throw error;
        }

        const user = await USERS.findById(userIdToUpdate);

        if (!user) {
            throw new Error("User không tồn tại!");
        }

        if (typeof req.body.admin !== "undefined" && req.user.admin) {
            user.admin = req.body.admin;
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password && req.body.password.length < 6) {
            throw new Error("Password phải có ít nhất 6 kí tự!");
        } else if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            user.password = hashedPassword;
        }

        const updatedUserProfile = await user.save();

        const token = await generateToken(updatedUserProfile)

        res.json({
            _id: updatedUserProfile._id,
            avatar: updatedUserProfile.avatar,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            verified: updatedUserProfile.verified,
            admin: updatedUserProfile.admin,
            token: token,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateProfilePicture = async (req, res, next) => {
    try {
        const upload = uploadPicture.single("profilePicture");

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error(
                    "Đã xảy ra lỗi không xác định khi upload: " + err.message
                );

                next(error);
            } else {
                if (req.file) {
                    let filename;
                    let updatedUser = await USERS.findById(req.user._id);

                    filename = updatedUser.avatar;
                    if (filename) {
                        deleteFile(filename);
                    }

                    updatedUser.avatar = req.file.filename;
                    await updatedUser.save();

                    const token = await generateToken(updatedUser)

                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: token,
                    });
                } else {
                    let filename;
                    let updatedUser = await USERS.findById(req.user._id);

                    filename = updatedUser.avatar;
                    updatedUser.avatar = "";

                    await updatedUser.save();
                    deleteFile(filename);

                    const token = await generateToken(updatedUser)

                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: token,
                    });
                }
            }
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {

}

export const deleteUserById = async (req, res, next) => {
    try {
        const user = await USERS.findById(req.params.userId);

        if (!user) {
            throw new Error("User không tồn tại!");
        }

        const postsToDelete = await POSTS.find({ user: user._id });
        const postIdsToDelete = postsToDelete.map((post) => post._id);

    } catch (error) {
        console.log(error);
        next(error);
    }
}