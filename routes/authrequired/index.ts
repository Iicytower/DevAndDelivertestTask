import { Router } from "express";

const router = Router();

import films from "./films";
import species from "./species";
import vehicles from "./vehicles";
import starships from "./starships";
import planets from "./planets";
import specificID from "./specificID";

router.use("/films", films);
router.use("/species", species);
router.use("/vehicles", vehicles);
router.use("/starships", starships);
router.use("/planets", planets);
router.use("/specificID", specificID);

export default router;