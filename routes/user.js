const { Router } = require("express");
const { check } = require("express-validator");
const Role = require('../models/role');
const { getUser, addUser, deleteUser } = require("../controllers/user");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get('/', getUser);

router.post('/', [
    check('name', 'The name is required').notEmpty(),
    check('email', 'The email is no valid').isEmail(),
    check('password', 'The password must has at least 6 character').isLength({ min: 6 }),
    check('role').custom(async (role = '') => {
        const existRole = await Role.findOne({ role });

        if (!existRole || existRole === undefined) {
            throw new Error(`The role ${role} is not allowed`);
        }
    }),
    validateFields
], addUser);

router.delete('/', deleteUser);

module.exports = router;
