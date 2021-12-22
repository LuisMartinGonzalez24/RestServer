import { Router } from "express";
import { check } from "express-validator";
import { addProduct, getProducts } from "../controllers/product";
import { existCategory } from "../helpers/dbValidations";
import { validateFields } from "../middlewares/validateFields";
import { isValidJwt } from "../middlewares/validateJwt";

const router: Router = Router();

//* Get all categories - public
router.get('/', getProducts);

//* Create category - private - anyone with a valid token
router.post('/:id', [
    isValidJwt,
    check('id', 'Is not a mongo id').isMongoId(),
    check('id').custom(existCategory),
    check('name', 'The name is required').notEmpty(),
    validateFields,
], addProduct);

export default router;