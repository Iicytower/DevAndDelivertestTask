import * as dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import sessionFileStore from 'session-file-store';
import passport from 'passport';

const FileStore = sessionFileStore(session);
const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    genid: (req) => {
        return uuidv4()
    },
    store: new FileStore(),
    secret: 'keyboard cat', //TODO process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))


import indexRouter from "./routes/index";
app.use("/", indexRouter);

const PORT: number = (!!process.env.PORT) ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`App is listening on port ${PORT}!`);
});