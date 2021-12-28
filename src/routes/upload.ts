import { Router } from "express";
import { uploadFile } from "../controllers/upload";

const router: Router = Router();

router.post('/', uploadFile);

export default router;