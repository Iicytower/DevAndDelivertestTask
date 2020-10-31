import { Request, Response } from 'express';
import database from "../database/database";
const { User } = database.models;
import bcrypt from "bcryptjs";

const register = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({
      where: {
        email,
      },
      attributes: ["email"],
    });
    if (!!isExist) {
      return res.status(200).json({
        status: "failure",
        msg: `User with email ${email} exist. Use diffrent adress.`
      })
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: `failure`,
      msg: "Somthing goes wrong with register"
    });
  }

  try {

    const characterSW: number = Math.floor(Math.random() * 83) + 1;

    const salt: string = bcrypt.genSaltSync(10);
    const addUser = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
      salt,
      characterSW,
    });

    return res.status(200).json({
      status: `succes`,
      msg: `success register user with email ${email}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: `failure`,
      msg: "Somthing goes wrong with register",
    });
  }
}

export default register;