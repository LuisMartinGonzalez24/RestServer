import { Request, Response, NextFunction } from "express";
const { validationResult } = require('express-validator');

const validateFields = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json(errors);
    }

    next();
}

export {
    validateFields,
};