import { Router } from 'express';
import UserRoute from './user';
import AuthRoute from './auth';
import CategoryRoute from './category';

const router: Router = Router();

router.use('/api/auth', AuthRoute);
router.use('/api/user', UserRoute);
router.use('/api/category', CategoryRoute);

export default router;