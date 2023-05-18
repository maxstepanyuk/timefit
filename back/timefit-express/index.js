import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { registrationValidation } from './validations/registrationValidation.js'

import  UserModel from './models/User.js'

dotenv.config() //to get date from .env file
const PORT = process.env.PORT || 4444 //get port from env file or use 5000
const USER = process.env.USER
const PASS = process.env.PASS

mongoose.connect(`mongodb+srv://${USER}:${PASS}@cluster0.r1umkoa.mongodb.net/?retryWrites=true&w=majority`)
.then(() => console.log('mongodb ok'))
.catch((err) => console.log('mongodb error', err));

const app = express(); // Creating an instance of the express application

app.use(express.json()) // Middleware to parse incoming JSON data

// Handling GET request to the root URL ('/')
app.get('/', (req, res) => {res.send('OK');});

//reg post
app.post('/auth/registration', registrationValidation, async (req, res) => {
    try {
        //check for any validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        //get data from req
        const { login, name, email, password } = req.body;    
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
        const {_id:id} = savedUser._doc; //get _id and set value to id
        res.json({
            succes: true,
            message: "The user is successfully registered",
            // userDoc, savedUser,
            id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succes: false,
            message: "Registration error"
        })
    }
});

// Starting the server on port 4444 and handling any potential errors
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`server started on port ${PORT}`);
})