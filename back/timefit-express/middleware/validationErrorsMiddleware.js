import { validationResult } from 'express-validator';

export default (req, res, next) => {
    //skip OPTIONS. to ckeck POST GET ...
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        //check for any validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        //go to next middlaware
        next()
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "internal server error" })
    }
};
