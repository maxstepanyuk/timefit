import Workout from './../models/Workout.js';
import { validationResult } from 'express-validator';

export const create = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new workout based on the validated request body
        // "user: req.body.user.id" comes from "middleware/authMiddleware.js"
        const workoutDoc = new Workout({
            workoutName: req.body.workoutName,
            grups: req.body.grups,
            user: req.body.user.id
        });
        // workout.user = req.userId

        // Save the workout to the database
        const savedWorkout = await workoutDoc.save();

        res.status(201).json(savedWorkout);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create workout' });
    }
};

export const getAll = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Get the workouts from the database
        const workouts = await Workout.find();
        // const workouts = await Workout.find().populate('user').exec(); //get full user info

        res.json(workouts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to find workouts' });
    }
};

export const getAllByUserId = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //get data from req
        const userId = req.params.userId;

        // Get the workouts from the database
        const workouts = await Workout.find({ user: userId });
        // const workouts = await Workout.find().populate('user').exec(); //get full user info

        res.json(workouts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to find workouts' });
    }
};

export const getAllByCurrentUser = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //get data from req
        const userId = req.body.user.id;

        // Get the workouts from the database
        const workouts = await Workout.find({ user: userId });

        res.json(workouts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to find workouts' });
    }
};

export const getOne = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //get data from req
        const workoutId = req.params.id;

        // Get the workouts from the database
        const workout = await Workout.findOne({ _id: workoutId })

        //response
        res.json(workout);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to find workout' });
    }
};
