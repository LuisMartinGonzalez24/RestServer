import { model, Schema } from "mongoose";
import { Category } from "../interfaces/schemeInterfaces";
import { Collections } from "../types/types";

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true,
    },

    status: {
        type: Boolean,
        default: true,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: Collections.USER,
        required: true, 
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, status, ...category } = this.toObject();
    return category;
};

export default model(Collections.CATEGORY, CategorySchema);