import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IGetTokenRequest } from '../interfaces/RequestInterfaces';

interface PayloadJWTProps extends JwtPayload {
    uid: string;
}

const isValidJwt = (request: IGetTokenRequest, response: Response, next: NextFunction) => {
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

        request.uid = payload.uid;

        next();
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