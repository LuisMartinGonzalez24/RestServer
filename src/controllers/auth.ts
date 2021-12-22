import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/index";
import { User as UserInterface } from '../interfaces/schemeInterfaces';
import { generateJwt } from "../helpers/commonFunctions";
import { verifyGoogleToken } from "../helpers/verifyGoogleToken";

const signIn = async (request: Request, response: Response) => {

    const { email, password, } = request.body;

    try {
        //* Verify if user exist
        const user = await UserModel.findOne({ email });

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

const onGoogleSignIn = async (request: Request, response: Response) => {

    const { idToken } = request.body;

    try {

        const { name, email, picture } = await verifyGoogleToken(idToken);

        let user = await UserModel.findOne({ email });

        if (user) {
            if (!user.status) {
                return response.status(401).json({
                    msg: 'Call to support, user blocked/desactivated'
                });
            } else {
                //* Generate JWT
                const token = await generateJwt(user.id);

                return response.json({
                    user,
                    token,
                });
            }
        } else {
            //* Create user
            const data: UserInterface = {
                name,
                email,
                password: ':p',
                image: picture,
                role: 'USER_ROLE',
                google: true,
                status: true,
            }

            user = new UserModel(data);
            await user.save();
        }


        response.status(200).json({
            msg: 'Google Sign in',
            idToken,
        })

    } catch (error) {
        response.status(400).json({
            msg: 'Google token is not valid',
        })
    }
};

export {
    signIn,
    onGoogleSignIn
};