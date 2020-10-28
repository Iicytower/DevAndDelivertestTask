import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';



const JWT_KEY = 'test'; //TODO process.env.JWT_KEY

export default {
    isLogin: async (req: Request, res: Response, next: NextFunction) => {
        if (!req.cookies.token) {
            return res.json({
                status: "failure",
                msg: "There is no token."
            })
        }

        jwt.verify(req.cookies.token, JWT_KEY, async (err: any, decoded: any) => {
            if (err) {
                return res.json({
                    status: "failure",
                    msg: "Token is invalid",
                });
            }
            req.user = decoded;
                next();
            
        });
        
    }
}