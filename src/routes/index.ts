import { Router } from 'express';
import UserRoute from './user';
import AuthRoute from './auth';

const router: Router = Router();

router.use('/api/user', UserRoute);
router.use('/api/auth', AuthRoute);

export default router;