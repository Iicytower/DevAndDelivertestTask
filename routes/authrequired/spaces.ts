import spaces from "../../controllers/authrequired/spaces";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    spaces);

export default router;