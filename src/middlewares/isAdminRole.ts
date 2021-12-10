import { NextFunction, Response } from "express";
import { IGetTokenRequest } from "../interfaces/requestInterfaces";

const isAdminRole = (request: IGetTokenRequest, response: Response, next: NextFunction) => {

    if (
        !request.authenticatedUser ||
        request.authenticatedUser === undefined
    ) {
        return response.status(500).json({
            msg: 'The role of the user cannot be verified, without first validating the token.'
        });
    }

    const { name, role } = request.authenticatedUser;

    if (role !== 'ADMIN_ROLE') {
        return response.status(401).json({
            msg: `The user ${name} doesn't privileges`
        });
    }

    next();
}

export { isAdminRole };