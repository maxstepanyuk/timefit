import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

import { registrationValidation } from './validations/registrationValidation.js'

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

app.post('/auth/registration', registrationValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    res.json({
        succes: true,
        message: "The user is successfully registered"
    })
});

// Starting the server on port 4444 and handling any potential errors
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`server started on port ${PORT}`);
})