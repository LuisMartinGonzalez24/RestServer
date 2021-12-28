import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { UserModel, ProductModel } from "../models/index";
import { Collections } from "../types/types";

const returnResults = async (collection: string, value: string) => {
    try {
        switch (collection) {
            case Collections.USER:

                const results = await ProductModel.find({ name: value });
                const data = results.map(({ name, price, description }) => ({
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

    if (isValidObjectId(collection)) {
        const user = await UserModel.findById(collection);
        const results = user ? [user] : { msg: "Id doesn't exist" };

        return response.json({
            results,
        });
    }

    const regex = new RegExp(collection, 'i');

    console.log('regex: ', regex);

    const conRegex = await UserModel.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{status: true,}]
    });

    const sinRegex = await UserModel.find({
        $or: [{ name: collection }, { email: collection }]
    });

    const collections = Object.values(Collections);

    const result = await returnResults('User', 'Galletas saladas');

    console.log('from find: ', collections.find(x => x === collection));
    console.log('collection param: ', collection);
    console.log('searchInCollection: ', collections);
    console.log('results from switch: ', result);


    response.json({
        msg: 'get from search',
        conRegex,
        sinRegex,
    });
};

export {
    search,
};