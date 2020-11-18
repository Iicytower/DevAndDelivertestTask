import species from "../../controllers/authrequired/species";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    species);

export default router;