import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { registrationValidation } from './validations/registrationValidation.js'
import { workoutValidation } from './validations/workoutValidation.js'

import authMiddleware from './middleware/authMiddleware.js'

import * as UserController from './controllers/userController.js'
import * as WorkoutController from './controllers/workoutController.js';

dotenv.config() //to get data from .env file
const PORT = process.env.PORT
const USER = process.env.USER
const PASS = process.env.PASS

mongoose.connect(`mongodb+srv://${USER}:${PASS}@cluster0.r1umkoa.mongodb.net/timefit?retryWrites=true&w=majority`)
    .then(() => console.log('mongodb ok'))
    .catch((err) => console.log('mongodb error', err));

const app = express(); // Creating an instance of the express application

app.use(express.json()) // Middleware to parse incoming JSON data

// Handling requests
app.get('/', (req, res) => { res.send('OK'); });
app.post('/auth/registration', registrationValidation, UserController.registration);
app.post('/auth/login', UserController.login);
app.get('/auth/myinfo', authMiddleware, UserController.myinfo);

app.post('/workouts', authMiddleware, workoutValidation, WorkoutController.create);
app.get('/workouts', authMiddleware, WorkoutController.getAll);
app.get('/workouts/:id', authMiddleware, WorkoutController.getOne);
app.get('/workouts/user/:userId', authMiddleware, WorkoutController.getAllByUserId);


// Starting the server on port 4444 and handling any potential errors
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`server started on port ${PORT}`);
})