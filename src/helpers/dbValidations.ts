import { RoleModel, UserModel, CategoryModel, ProductModel } from '../models/index';

const validateRoles = async (role: string) => {
    const existRole = await RoleModel.findOne({ role });

    if (!existRole || existRole === undefined) {
        throw new Error(`The role ${role} is not allowed`);
    };
}

const emailExist = async (email: string) => {
    //* Verify if the email exixsts
    const existEmail = await UserModel.findOne({ email });

    if (existEmail) {
        throw new Error(`The email: ${email} already exist`);
    }
}

const userExistsById = async (id: string) => {
    //* Verify if the user with id exists
    const existUser = await UserModel.findById(id);

    if (!existUser) {
        throw new Error(`The user with id: ${id} not exists`);
    }
}

const existCategory = async (id: string) => {
    const category = await CategoryModel.findById(id);

    if (!category) {
        throw new Error(`The category with id: ${id} not exists`);   
    }

    if (category.status === false) {
        throw new Error(`The category does not exists - eliminated`);   
    }
};

const existProduct = async (id: string) => {
    const product = await ProductModel.findById(id);

    if (!product) {
        throw new Error(`The product with id: ${id} not exists`);   
    }

    if (product.status === false) {
        throw new Error(`The product does not exists - eliminated`);   
    }
};

export {
    validateRoles,
    emailExist,
    userExistsById,
    existCategory,
    existProduct,
};
