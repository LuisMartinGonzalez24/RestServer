const { Router } = require("express");
const { check } = require("express-validator");
const { getUser, addUser, updateUser, deleteUser } = require("../controllers/user");
const { validateRoles, emailExist, userExistsById } = require("../helpers/dbValidations");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get('/', getUser);

router.post('/', [
    check('name', 'The name is required').notEmpty(),
    check('email', 'The email is no valid').isEmail(),
    check('email').custom(emailExist),
    check('password', 'The password must has at least 6 character').isLength({ min: 6 }),
    check('role').custom(validateRoles),
    validateFields
], addUser);

router.put('/:id', [
    check('id', 'Is not a mongo id').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
], updateUser);

router.delete('/:id', [
    check('id', 'Is not a mongo id').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
], deleteUser);

module.exports = router;
