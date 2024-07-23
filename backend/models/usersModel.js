import mongoose from "mongoose"

const usersSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        verificationCode: {
            type: String,
            required: false
        },
        admin: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

const USERS = mongoose.model("users", usersSchema);

export default USERS;