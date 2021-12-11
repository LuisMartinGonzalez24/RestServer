import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { generateJwt } from "../helpers/commonFunctions";

const signIn = async (request: Request, response: Response) => {

    const { email, password, } = request.body;

    try {
        //* Verify if user exist
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).json({
                msg: 'Email/password incorrect - email'
            })
        }

        //* Verify if user is active
        if (!user.status) {
            return response.status(400).json({
                msg: 'User is not active'
            })
        }

        //* Verify password
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return response.status(400).json({
                msg: 'Email/password incorrect - password'
            })
        }

        //* Generate JWT
        const token = await generateJwt(user.id);

        response.json({
            user,
            token
        })
    } catch (error) {
        response.status(500).json({
            msg: 'Call to support'
        })
    }
};

export {
    signIn,
};