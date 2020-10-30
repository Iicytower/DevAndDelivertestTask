import { Router } from "express";

const router = Router();

import films from "./films";
import spaces from "./spaces";
import vehicles from "./vehicles";

router.use("/films", films);
router.use("/spaces", spaces);
router.use("/vehicles", vehicles);

export default router;