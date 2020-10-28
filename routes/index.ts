import { Router } from "express";

import register from './register';
import login from './login';
import authrequired from './authrequired/index';

const router = Router();

router.get("/", (req,res)=> res.end('You hit the home page'));

router.use("/register", register);
router.use("/login", login);

router.use("/authrequired", (req, res, next) => {
    console.log(`User authenticated? ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
        next();
    } else {
        res.redirect('/')
    }
}, authrequired);

export default router;