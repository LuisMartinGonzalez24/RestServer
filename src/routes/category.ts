import { Router } from "express";
import { check } from "express-validator";
import {
    getCategories,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category";
import { existCategory, userExistsById } from "../helpers/dbValidations";
import { isAdminRole } from "../middlewares/isAdminRole";
import { validateFields } from "../middlewares/validateFields";
import { isValidJwt } from "../middlewares/validateJwt";

const router: Router = Router();

//* Get all categories - public
router.get('/', getCategories);

//* Get a category by id - public
router.get('/:id', [
    check('id').custom(existCategory),
    validateFields,
], getCategory);

//* Create category - private - anyone with a valid token
router.post('/', [
    isValidJwt,
    check('name', 'The name is required').notEmpty(),
    validateFields,
], addCategory);

//* Update category - private - anyone with a valid token
router.put('/:id', [
    isValidJwt,
    check('id').custom(existCategory),
    check('status').isBoolean(),
    validateFields,
], updateCategory);

//* Delete category - private - Admin user
router.delete('/:id', [
    isValidJwt,
    isAdminRole,
    check('id', 'Is not a mongo id').isMongoId(),
    check('id').custom(existCategory),
    validateFields,
], deleteCategory);

export default router;