import register from "../controllers/register";

import { Router } from "express";
import * as bodyParser from 'body-parser';
import validator from "../middlewares/validator";
import { check } from "express-validator";

const router = Router();
const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)])(?=.*[A-Z])(?!.*\s).{8,}$/g;

router.post(
    "/",
    bodyParser.json(),
    [
        check("email").isEmail().trim(),
        check("password").isString().matches(regexpPassword),
    ],
    validator(),
    register);

export default router;