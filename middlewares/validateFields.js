const { validationResult } = require('express-validator');

const validateFields = (request, res, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateFields,
};