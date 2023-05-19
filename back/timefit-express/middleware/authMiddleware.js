import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config() //to get date from .env file
const JWT_SECRET = process.env.JWT_SECRET


export default (req, res, next) => {
    //skip OPTIONS. to ckeck POST GET ...
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        //get the token without type
        // const token = req.headers.authorization.split(' ')[1]
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
        //if token doesnt exist 
        if (!token) {
            return res.status(403).json({
                succes: false,
                message: "not authorized"
            })
        }
        //decode token to get payload
        const decodedData = jwt.verify(token, JWT_SECRET)
        req.body.user = decodedData
        //go to next middlaware
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: "The user is not authorized" })
    }
};
