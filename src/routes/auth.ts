import { Router } from "express";
import { check } from 'express-validator';
import { signIn, onGoogleSignIn } from "../controllers/auth";
import { validateFields } from "../middlewares/validateFields";

const router: Router = Router();

router.post('/login', [
    check('email', 'The email is no valid').isEmail(),
    check('password', 'The password is required').notEmpty(),
    validateFields,
], signIn);

router.post('/google', [
    check('idToken', 'The id-token is required').notEmpty(),
    onGoogleSignIn,
], signIn);

export default router;