import { Router } from "express";

import register from './register';
import login from './login';

const router = Router();

router.use("/", register);
router.use("/", login);

export default router;