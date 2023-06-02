import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { registrationValidation } from './validations/registrationValidation.js'

import  authMiddleware from './middleware/authMiddleware.js'

import * as UserController from './controllers/userController.js'

dotenv.config() //to get date from .env file
const PORT = process.env.PORT || 4444 //get port from env file or use 5000
const USER = process.env.USER
const PASS = process.env.PASS

mongoose.connect(`mongodb+srv://${USER}:${PASS}@cluster0.r1umkoa.mongodb.net/timefit?retryWrites=true&w=majority`)
.then(() => console.log('mongodb ok'))
.catch((err) => console.log('mongodb error', err));

const app = express(); // Creating an instance of the express application

app.use(express.json()) // Middleware to parse incoming JSON data

// Handling GET request to the root URL ('/')
app.get('/', (req, res) => {res.send('OK');});

//reg post
app.post('/auth/registration', registrationValidation, UserController.registration);

//login post
app.post('/auth/login', UserController.login);

//login post
app.get('/auth/myinfo', authMiddleware, UserController.myinfo);


// Starting the server on port 4444 and handling any potential errors
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`server started on port ${PORT}`);
})