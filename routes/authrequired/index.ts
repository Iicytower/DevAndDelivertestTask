import { Router } from "express";

const router = Router();

import films from "./films";

router.use("/films", films);

export default router;