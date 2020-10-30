import starships from "../../controllers/authrequired/starships";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    starships);

export default router;