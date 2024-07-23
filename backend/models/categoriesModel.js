import mongoose from "mongoose"

const categoriesShema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const CATEGORIES = mongoose.model("categories", categoriesShema);

export default CATEGORIES;