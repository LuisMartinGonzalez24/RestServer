import { Request, Response } from "express";
import { UserModel, ProductModel } from "../models/index";
import { Collections } from "../types/types";

const returnResults = async (collection: string, value: string) => {
    try {
        switch (collection) {
            case Collections.USER:

                const results = await ProductModel.find({ name: value });
                const data = results.map(({name, price, description}) => ({
                    name, price, description
                }));

                return data;

            default:
                return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const search = async (request: Request, response: Response) => {

    const { collection } = request.params;

    const collections = Object.values(Collections);

    const result = await returnResults('User', 'Galletas saladas');

    console.log('from find: ', collections.find(x => x === collection));
    console.log('collection param: ', collection);
    console.log('searchInCollection: ', collections);
    console.log('results from switch: ', result);

    response.json({
        msg: 'get from search',
    });
};

export {
    search,
};