import { Request, Response } from 'express';
import database from "../database/database";
const { User } = database.models;
import bcrypt from "bcryptjs";

const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const foundUser = await User.findOne({
            where: { email },
            attributes: ["UserID", "email", "password", "salt", "characterSW"],
          });
        //   console.log(findUser?.getDataValue);

        if(!foundUser){
            return res.status(200).json({
                status: `failure`,
                msg: `failed login user with email ${email} does not exist`,
              });
        }else{
            const loggedUser = {
                UserID: foundUser.getDataValue("UserID"),
                email: foundUser.getDataValue("email"),
                password: foundUser.getDataValue("password"),
                salt: foundUser.getDataValue("salt"),
                characterSW: foundUser.getDataValue("characterSW"),
            }
            
            // const loggedUser = foundUser.dataValue;
            // console.log(foundUser);
            console.log(loggedUser);
        }


        return res.status(200).json({
            status: `succes`,
            msg: `success login user with email ${email}`,
          });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with login"
        });
    }


}

export default login;