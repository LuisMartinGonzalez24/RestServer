import { model, Schema } from "mongoose";
import { Category } from "../interfaces/schemeInterfaces";

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
        ref: 'User',
        required: true, 
    }
});

export default model('Category', CategorySchema);