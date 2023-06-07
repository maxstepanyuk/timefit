import bcrypt from 'bcrypt';
import UserModel from './../models/User.js'
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const registration = async (req, res) => {
    try {
        //get data from req
        const { login, name, email, password } = req.body;
        //check in db
        const candidateLogin = await UserModel.findOne({ login }) //find by username
        const candidateEmail = await UserModel.findOne({ email }) //find by email
        const errorMessages = {};

        if (candidateLogin) {
            errorMessages.login = "A user with that login already exists";
        }
        if (candidateEmail) {
            errorMessages.email = "A user with that email already exists";
        }
        if (Object.keys(errorMessages).length > 0) {
            return res.status(409).json({
                errorMessages,
            });
        }
        //pass hash (salt - random data)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        //create
        const userDoc = new UserModel({
            login: login,
            email: email,
            name: name,
            password: passwordHash
        });
        //save
        const savedUser = await userDoc.save();
        //todo - generate jwt??
        //feedback
        const { _id: id } = savedUser._doc; //get _id and set value to id
        res.json({
            message: "The user is successfully registered",
            // userDoc, savedUser,
            id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Registration error"
        })
    }
};

const generateJwt = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "60m" })
}

export const login = async (req, res) => {
    try {
        //get data from req
        const { login, password } = req.body;
        //check in db
        const user = await UserModel.findOne({ login }); //find by login
        if (!user) {
            return res.status(404).json({
                message: `Incorrect login or password` 
            });
        }
        //check password and hash for found user
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(404).json({
                message: `Incorrect login or password` 
            });
        }
        //get _id and set value to id
        const { _id: id } = user._id; 
        //gwt
        const token = generateJwt({ id })
        //response
        return res.status(202).json({
            token,
            // id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "login error"
        })
    }
};

export const myinfo = async (req, res) => {
    try {
        //get dada from req
        const id = req.body.user.id;
        // check in db and get info
        const userInfo = await UserModel.findOne({ _id: id }); //find by fiedl _id wuth the walue of the id const
        if (!userInfo) {
            return res.status(404).json({ message: `No user found` });
        }
        //remove password from response
        const { password, ...user } = userInfo._doc
        //response
        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "myinfo error"
        })
    }
}
