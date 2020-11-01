import { NextFunction, Request, Response } from 'express';
import database from "../database/database";
const { User } = database.models;
import bcrypt from "bcryptjs";
import getUserHeroData from '../helpers/heroInfo';

import passport from "passport";
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

const login = async (req: Request, res: Response, next: NextFunction) => {

    if (!!req.user) {
        return res.status(200).json({
            status: 'failure',
            mgs: "You are already logged in."
        })
    }

    const { email, password } = req.body;

    try {
        let loggedUser = {
            email: '',
            password: '',
            characterSW: -1,
        };

        passport.use(new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                const foundUser = await User.findOne({
                    where: { email },
                    attributes: ["email", "password", "characterSW"],
                });

                if (!foundUser) {
                    delete req.session;
                    return res.status(200).json({
                        status: `failure`,
                        msg: `failed login user with email ${email} does not exist`,
                    });
                }

                loggedUser.email = foundUser.getDataValue("email");
                loggedUser.password = foundUser.getDataValue("password");
                loggedUser.characterSW = foundUser.getDataValue("characterSW");

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
            const user = loggedUser.email === email ? loggedUser : false;
            done(null, user);
        });

        await passport.authenticate('local', (err, user) => {
            req.login(user, async (err) => {

                if (err) return console.error(err);


                const heroInfo = await getUserHeroData(user);

                return res.status(200).json({
                    status: `succes`,
                    msg: `success login user with email ${email}. Welcome ${heroInfo.name}`,
                });
            })
        })(req, res, next);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with login"
        });
    }


}

export default login;