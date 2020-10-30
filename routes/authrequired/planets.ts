import planets from "../../controllers/authrequired/planets";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    planets);

export default router;