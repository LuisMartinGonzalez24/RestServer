import { Router } from 'express';
import { check } from 'express-validator';
import { getUser, addUser, updateUser, deleteUser } from '../controllers/user';
import { validateRoles, emailExist, userExistsById } from '../helpers/dbValidations';
import { validateFields } from '../middlewares/validateFields';

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
