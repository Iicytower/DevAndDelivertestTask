import * as dotenv from "dotenv"; dotenv.config();

import express from "express";
import bodyParser from "body-parser";
// import  initDbConnection  from "./database/database";

const app: express.Application = express();


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

import indexRouter from "./routes/index";
app.use("/", indexRouter);


const PORT: number = (!!process.env.PORT) ? parseInt(process.env.PORT) : 3000;

// initDbConnection();
app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`App is listening on port ${PORT}!`);
});