import { Request, Response } from 'express';
import database from "../../database/database";
const { User } = database.models;

const films = async (req: Request, res: Response) => {
   console.log("films controller");

   return res.status(200).json({
       status: "succes",
       msg: "you hit films endpoint",
   });

}

export default films;