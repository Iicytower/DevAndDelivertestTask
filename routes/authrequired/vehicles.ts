import vehicles from "../../controllers/authrequired/vehicles";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    vehicles);

export default router;