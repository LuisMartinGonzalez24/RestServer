import { Router } from "express";
import { check } from "express-validator";
import { addProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product";
import { existCategory, existProduct } from "../helpers/dbValidations";
import { isAdminRole } from "../middlewares/isAdminRole";
import { validateFields } from "../middlewares/validateFields";
import { isValidJwt } from "../middlewares/validateJwt";

const router: Router = Router();

//* Get all products - public
router.get('/', getProducts);

//* Create product - private - anyone with a valid token
router.post('/', [
    isValidJwt,
    check('categoryId', 'Is not a mongo id').isMongoId(),
    check('categoryId').custom(existCategory),
    check('name', 'The name is required').notEmpty(),
    validateFields,
], addProduct);

//* Update product - private - anyone with a valid token
router.put('/:id', [
    isValidJwt,
    check('id').custom(existProduct),
    check('name', 'The name is required').notEmpty(),
    validateFields,
], updateProduct);

//* Delete product - private - Admin user
router.delete('/:id', [
    isValidJwt,
    isAdminRole,
    check('id', 'Is not a mongo id').isMongoId(),
    check('id').custom(existProduct),
    validateFields,
], deleteProduct);

export default router;