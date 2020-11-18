import specificID from "../../controllers/authrequired/specificID";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    specificID);

export default router;