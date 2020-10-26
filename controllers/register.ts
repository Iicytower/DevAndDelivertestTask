import { Request, Response } from 'express';
import database from "../database/database";
const { User } = database.models;
import bcrypt from "bcryptjs";

const register =  async (req: Request, res: Response) => {

  const { email, password } = req.body;

    try {
      const isExist = await User.findOne({
        where: {
           email,
        },
        attributes: ["email"],
      });
      if (!!isExist){
        return res.status(200).json({
          status: "failure",
          msg: `User with email ${email} exist. Use diffrent adress.`
        })
      }
      

    } catch (err) {
      res.status(500).json({
        status: `failure`,
        msg: "somthing goes wrong with register"
      });
      throw err;
    }

    try {
      const addUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 11),
        salt: "something",
      });

      return res.status(200).json({
        status: `succes`,
        msg: `success register user`,
      });
    } catch (err) {
      res.status(500).json({
        status: `failure`,
      });
      throw err;
    }

  console.log(User);
  console.log(req.body);
  return res.end(`Hello TypeScript from register controller!`);
}

export default register;