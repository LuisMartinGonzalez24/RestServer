import { Request, Response } from "express";
import { IGetTokenRequest } from "../interfaces/requestInterfaces";
import { CategoryModel } from "../models/index";

interface IAddProductBody {
    name: string;
}

const getCategories = async (request: Request, response: Response) => {

    const filter = {
        status: true,
    }

    const categories = await CategoryModel.find(filter).populate('user', ['name', 'email']);

    response.json({
        msg: 'From get all categories',
        categories,
    })
};

const getCategory = async (request: Request, response: Response) => {

    const { id } = request.params;

    console.log(request.params);

    const category = await CategoryModel.findById(id);

    response.json({
        msg: 'From get by id',
        category
    })
};

const addCategory = async (request: IGetTokenRequest, response: Response) => {

    const { name }: IAddProductBody = request.body;

    try {
        const categoryDB = await CategoryModel.findOne({ name });

        if (categoryDB) {
            response.status(400).json({
                msg: 'This category already exist',
            })
        }

        //* Create data
        const data = {
            name,
            user: request.uid,
        };

        const category = new CategoryModel(data);

        //* Save into db
        await category.save();

        response.status(201).json(category);
    } catch (ex) {
        console.log('error to save category', ex);
    }

};

const deleteCategory = async (request: Request, response: Response) => {
    const { id } = request.params;

    const filter = {
        status: false,
    };

    let category = await CategoryModel.findByIdAndUpdate(id, filter, { new: true });

    response.json({
        msg: 'From delete by id',
        category
    })
};

const updateCategory = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, status } = request.body

    try {
        let category = await CategoryModel.findByIdAndUpdate(id, { name, status }, { new: true, });

        response.json({
            msg: 'From put by id',
            category
        })
    } catch (error) {
        response.status(400).json({
            msg: 'Error to update category',
            error,
        })
    }
};

export { getCategories, getCategory, addCategory, updateCategory, deleteCategory };