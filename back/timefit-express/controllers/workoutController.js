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
