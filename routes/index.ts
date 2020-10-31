import { Router } from "express";
import { Request, Response} from 'express';

import register from './register';
import login from './login';
import authrequired from './authrequired/index';

const router = Router();

router.get("/", (req: Request,res: Response)=> res.end('You hit the home page'));

router.use("/register", register);
router.use("/login", login);

router.use("/authrequired", 
(req, res, next) => (req.isAuthenticated()) ? next() : res.send('failed to auth'),
authrequired);

export default router;