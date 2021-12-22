import { Router } from 'express';
import UserRoute from './user';
import AuthRoute from './auth';
import CategoryRoute from './category';
import ProductRoute from './product';

const router: Router = Router();

router.use('/api/auth', AuthRoute);
router.use('/api/user', UserRoute);
router.use('/api/product', ProductRoute);
router.use('/api/category', CategoryRoute);

export default router;