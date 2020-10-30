const { validationResult } = require("express-validator")
import { Request, Response, NextFunction } from 'express';

function validator() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            next();
        } catch (err) {
            throw err;
        }
    };
}

export default validator;
