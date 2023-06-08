import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { registrationValidation } from './validations/registrationValidation.js'
import { workoutValidation } from './validations/workoutValidation.js'

import authMiddleware from './middleware/authMiddleware.js'
import validationErrorsMiddleware from './middleware/validationErrorsMiddleware.js'

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

// // Add the cors middleware - Cross-Origin Resource Sharing 
// // i wasted 4+ hours on this it it still does not work :C
// const whitelist = [
//     'http://127.0.0.1:3000',
//     'http://localhost:3000',
//     'http://0.0.0.0:3000'
// ]
// const corsOptions = {
//     // origin: (origin, callback) => {
//     //     if (whitelist.indexOf(origin) !== -1 || !origin){
//     //         callback(null, true);
//     //     } else {
//     //         callback(new Error('Not allowed by CORS'));
//     //     }
//     // },

//     credentials: true,
//     origin: 'http://localhost:3000',
//     // origin: '*',
//     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//     optionsSuccessStatus: 200,
//     allowedHeaders: ['content-type', 'Authorization', 'application/json']
// }
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json()) // Middleware to parse incoming JSON data

// Handling requests
app.post('/auth/registration', registrationValidation, validationErrorsMiddleware, UserController.registration);
app.post('/auth/login', UserController.login);
app.get('/auth/myinfo', authMiddleware, UserController.myinfo);

app.post('/workouts', authMiddleware, workoutValidation, validationErrorsMiddleware, WorkoutController.create);
app.get('/workouts', authMiddleware, WorkoutController.getAll);
app.get('/workouts/me', authMiddleware, WorkoutController.getAllByCurrentUser);
app.get('/workouts/:id', authMiddleware, WorkoutController.getOne);
app.get('/workouts/user/:userId', authMiddleware, WorkoutController.getAllByUserId);
app.delete('/workouts/:id', authMiddleware, WorkoutController.remove);
app.patch('/workouts/:id', authMiddleware, workoutValidation, validationErrorsMiddleware, WorkoutController.update);

app.get('/*', (req, res) => { res.status(404).send('404'); });

// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
//     console.error(err.stack)
//     res.status(500).send(err.message);
// }
// app.use(errorHandler);

// Starting the server on port 4444 and handling any potential errors
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`server started on port ${PORT}`);
})