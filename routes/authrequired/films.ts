import films from "../../controllers/authrequired/films";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    films);

export default router;