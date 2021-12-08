"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const { validationResult } = require('express-validator');
const validateFields = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json(errors);
    }
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validateFields.js.map