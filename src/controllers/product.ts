import { Request, Response } from "express";
import { IGetTokenRequest } from "../interfaces/requestInterfaces";
import { ProductModel } from '../models/index';

const getProducts = async (request: Request, response: Response) => {

    const filter = {
        status: true,
    }

    const [total, products] = await Promise.all([
        ProductModel.countDocuments(filter),
        ProductModel
            .find(filter)
            .populate('category', 'name')
            .populate('user', 'name')
    ])

    response.json({
        msg: 'get from getProducts',
        total,
        products,
    });
};

const addProduct = async (request: IGetTokenRequest, response: Response) => {

    const { categoryId, name, price, description } = request.body;

    try {

        const data = {
            name,
            price,
            description,
            user: request.uid,
            category: categoryId,
        };

        const product = new ProductModel(data);

        await product.save();

        response.status(201).json(product);
    } catch (ex) {
        console.log('error to save category', ex);
    }
}

const deleteProduct = async (request: Request, response: Response) => {
    const { id } = request.params;

    const filter = {
        status: false,
    };

    let product = await ProductModel.findByIdAndUpdate(id, filter, { new: true });

    response.json({
        msg: 'From delete by id',
        product
    })
};

const updateProduct = async (request: Request, response: Response) => {

    const { id } = request.params;
    const { name, price, description } = request.body;

    try {

        const data = {
            name,
            price,
            description,
        };

        const product = await ProductModel.findByIdAndUpdate(id, data, { new: true });

        response.status(200).json(product);
    } catch (ex) {
        console.log('error to update category', ex);
    }
};



export {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
}