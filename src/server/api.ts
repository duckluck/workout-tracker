import express from "express";
import { createWorkout, getAllWorkouts, getWorkoutById, deleteWorkout } from "../models/workoutSessionModel";
import { WorkoutSession } from "../types/workoutSession";

const router = express.Router();

// Get all workouts
router.get("/workouts", (req, res) => {
    res.json(getAllWorkouts());
});

// Get a specific workout
router.get("/workouts/:id", (req, res) => {
    const workout = getWorkoutById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
});

// Create a new workout
router.post("/workouts", (req, res) => {
    const newWorkout: WorkoutSession = { id: Date.now().toString(), ...req.body };
    createWorkout(newWorkout);
    res.status(201).json(newWorkout);
});

// Delete a workout
router.delete("/workouts/:id", (req, res) => {
    deleteWorkout(req.params.id);
    res.status(204).send();
});

export default router;
