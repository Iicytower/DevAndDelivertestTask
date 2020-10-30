import { Router } from "express";

const router = Router();

import films from "./films";
import spaces from "./spaces";

router.use("/films", films);
router.use("/spaces", spaces);

export default router;