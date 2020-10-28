import { NextFunction, Request, Response } from 'express';
import database from "../database/database";
const { User } = database.models;
import bcrypt from "bcryptjs";
import passport from "passport";

import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    try {

        let loggedUser = {
            email: '',
            password: '',
        };
        passport.use(new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                const foundUser = await User.findOne({
                    where: { email },
                    attributes: ["email", "password"],
                });

                if (!foundUser) {
                    return res.status(200).json({
                        status: `failure`,
                        msg: `failed login user with email ${email} does not exist`,
                    });
                }

                loggedUser.email = foundUser.getDataValue("email");
                loggedUser.password = foundUser.getDataValue("password");


                if (bcrypt.compareSync(password, loggedUser.password)) {
                    return done(null, loggedUser)
                } else {
                    return res.status(200).json({
                        status: `failure`,
                        msg: `wrong email or password`,
                    });
                }
            }
        ));
        passport.serializeUser((loggedUser: any, done) => {
            done(null, loggedUser.email);
        });

        passport.deserializeUser((email, done) => {
            console.log('Inside deserializeUser callback')
            console.log(`The user email passport saved in the session file store is: ${email}`)
            const user = loggedUser.email === email ? loggedUser : false;
            done(null, user);
        });

        await passport.authenticate('local', (err, user, info) => {
            req.login(user, (err) => {
                return res.status(200).json({
                    status: `succes`,
                    msg: `success login user with email ${email}`,
                });
            })
        })(req, res, next);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with login"
        });
    }


}

export default login;