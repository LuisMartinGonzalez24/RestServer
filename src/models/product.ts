import { model, Schema } from "mongoose";
import { Product } from "../interfaces/schemeInterfaces";
import { Collections } from "../types/types";

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
        ref: Collections.USER,
        required: true, 
    },

    price: {
        type: Number,
        default: 0,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: Collections.CATEGORY,
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

export default model(Collections.PRODUCT, ProductSchema);