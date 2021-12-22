import { model, Schema } from "mongoose";
import { Product } from "../interfaces/schemeInterfaces";

const ProductSchema = new Schema<Product>({
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
    },

    price: {
        type: Number,
        default: 0,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

    description: {
        type: String,
    },

    available: {
        type: Boolean,
        default: true,
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...product } = this.toObject();
    return product;
};

export default model('Product', ProductSchema);