import { Router } from "express";

const router = Router();

import films from "./films";
import spaces from "./spaces";
import vehicles from "./vehicles";
import starships from "./starships";

router.use("/films", films);
router.use("/spaces", spaces);
router.use("/vehicles", vehicles);
router.use("/starships", starships);

export default router;