import { Router } from "express";
import { search } from "../controllers/search";

const router: Router = Router();

router.get('/:collection', search);

export default router;