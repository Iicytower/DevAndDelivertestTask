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
    console.log(err);
    return res.status(500).json({
      status: `failure`,
      msg: "somthing goes wrong with register"
    });
  }

  try {

    const charId: number = Math.floor(Math.random() * 83) + 1;

    const salt = bcrypt.genSaltSync(10);
    const addUser = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
      salt: salt,
      characterSW: charId,
    });

    return res.status(200).json({
      status: `succes`,
      msg: `success register user with email ${email}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: `failure`,
    });
  }
}

export default register;