import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { getAndConvertToNumber } from '../helpers/commonFunctions';
import { UpdateQuery } from 'mongoose';

const getUser = async (request: Request, response: Response) => {

    const { limit, initial } = request.query;

    const defaultLimit = getAndConvertToNumber(limit, 5);
    const defaultInitial = getAndConvertToNumber(initial, 0);

    const filter = {
        status: true,
    };

    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
            .limit(defaultLimit)
            .skip(defaultInitial)
    ]);


    response.json({
        total,
        users,
    });
};

const addUser = async (request: Request, response: Response) => {

    const { name, email, password, google, role } = request.body;

    const user = new User({
        name,
        email,
        password,
        google,
        role
    });

    //* Encrypt password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    //* Save in DB
    await user.save();

    response.json({
        msg: 'post api - controller',
        user,
    });
};

const updateUser = async (request: Request, res: Response) => {

    const { id } = request.params;
    const { _id, password, google, email, ...restProperties } = request.body;

    //* Validate password
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        restProperties.password = bcrypt.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, restProperties);
    const updatedUser = await User.findOne({ id });

    res.json({
        msg: 'update api - controller',
        updatedUser,
    });
};

const deleteUser = async (request: Request, response: Response) => {

    const { id } = request.params;

    const filter: any = {
        status: false,
    };

    const deletedUser = await User.findByIdAndUpdate(id, filter);

    response.json(deletedUser);
};

export {
    getUser,
    addUser,
    updateUser,
    deleteUser,
};
