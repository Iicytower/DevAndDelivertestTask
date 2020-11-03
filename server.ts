import * as dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import sessionFileStore from 'session-file-store';
import passport from 'passport';
import fs from "fs";

const FileStore = sessionFileStore(session);
const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    genid: (req) => {
        return uuidv4()
    },
    store: new FileStore({
        ttl: 1000 * 60 * 60 * 24,
    }),
    secret: 'keyboard cat', //TODO process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    rolling: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
        
    }
}));

app.use(passport.initialize());
app.use(passport.session());

import indexRouter from "./routes/index";
app.use("/", indexRouter);

try {
    const path: string = `${__dirname}/sessions/`;
    if (fs.existsSync(path)) {
        fs.rmdirSync(path, { recursive: true, });
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) console.error(err);
        });
    }
} catch (err) {
    console.error(err);
}
const PORT: number = (!!process.env.PORT) ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`App is listening on port ${PORT}!`);
});