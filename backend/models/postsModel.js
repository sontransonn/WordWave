import mongoose from "mongoose"

const postsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        caption: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        body: {
            type: Object,
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        tags: {
            type: [String]
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        }],
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

postsSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
});

const POSTS = mongoose.model("posts", postsSchema);

export default POSTS;