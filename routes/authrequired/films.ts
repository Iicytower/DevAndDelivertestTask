import films from "../../controllers/authrequired/films";

import { Router } from "express";
import bodyParser from 'body-parser';
import validator from "../../middlewares/validator";
import { check } from "express-validator";

const router = Router();

router.get(
    "/",
    // bodyParser.json(),
    // [
    //     check("email").isEmail(),
    //     check("password").isString()
    // ],
    // validator(), 
    films);

export default router;