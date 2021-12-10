import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import { IGetTokenRequest } from '../interfaces/requestInterfaces';

interface PayloadJWTProps extends JwtPayload {
    uid: string;
}

const isValidJwt = async (request: IGetTokenRequest, response: Response, next: NextFunction) => {
    const token = request.header('x-token');

    if (
        !token ||
        token === undefined
    ) {
        return response.status(401).json({
            msg: 'Must send token on request'
        });
    }

    try {
        const payload = <PayloadJWTProps>jwt.verify(token, process.env.ENCRYPTION_ALGORITHM_JWT || 'T3stAlg0r1thm');
        console.log(payload);

        const authenticatedUser = await User.findById(payload.uid);

        if (authenticatedUser) {
            if (!authenticatedUser.status) {
                return response.status(401).json({
                    msg: 'Token is not valid - User is not active/deleted'
                });
            }
            request.authenticatedUser = authenticatedUser;
            request.uid = payload.uid;
            next();
        } else {
            return response.status(401).json({
                msg: 'Token is not valid - User not exists'
            });
        }

    } catch (error) {
        console.log(error);
        response.status(401).json({
            msg: 'Token is not valid'
        });
    }
};

export {
    isValidJwt,
};