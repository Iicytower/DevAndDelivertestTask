import login from "../controllers/login";

import { Router } from "express";
import * as bodyParser from 'body-parser';
import validator from "../middlewares/validator";
import { check } from "express-validator";

const router = Router();

router.post(
    "/login",
    bodyParser.json(),
    [
        check("email").isEmail(),
        check("password").isString()
    ],
    validator(),
    login);

export default router;