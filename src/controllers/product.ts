import { Request, Response } from "express";
import { IGetTokenRequest } from "../interfaces/requestInterfaces";
import { ProductModel } from '../models/index';

const getProducts = async (request: Request, response: Response) => {

    const filter = {
        status: true,
    }

    const products = await ProductModel.find(filter);

    response.json({
        msg: 'get from getProducts',
        products,
    });
};

const addProduct = async (request: IGetTokenRequest, response: Response) => {
    const { id } = request.params;
    const { name, price, description } = request.body;

    try {
        
        const data = {
            name,
            price,
            description,
            user: request.uid,
            category: id,
        };

        const product = new ProductModel(data);

        await product.save();

        response.status(201).json(product);
    } catch (ex) {
        console.log('error to save category', ex);
    }
}


export {
    getProducts,
    addProduct,
}