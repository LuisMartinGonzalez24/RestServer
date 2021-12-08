"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const dbValidations_1 = require("../helpers/dbValidations");
const validateFields_1 = require("../middlewares/validateFields");
const router = (0, express_1.Router)();
router.get('/', user_1.getUser);
router.post('/', [
    (0, express_validator_1.check)('name', 'The name is required').notEmpty(),
    (0, express_validator_1.check)('email', 'The email is no valid').isEmail(),
    (0, express_validator_1.check)('email').custom(dbValidations_1.emailExist),
    (0, express_validator_1.check)('password', 'The password must has at least 6 character').isLength({ min: 6 }),
    (0, express_validator_1.check)('role').custom(dbValidations_1.validateRoles),
    validateFields_1.validateFields
], user_1.addUser);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'Is not a mongo id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidations_1.userExistsById),
    validateFields_1.validateFields,
], user_1.updateUser);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'Is not a mongo id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidations_1.userExistsById),
    validateFields_1.validateFields,
], user_1.deleteUser);
module.exports = router;
//# sourceMappingURL=user.js.map