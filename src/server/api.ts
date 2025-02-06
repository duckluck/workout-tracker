import express from "express";
import { WorkoutSession } from "../models/workoutSessionModel";

const router = express.Router();

// In-memory database (for now)
let workouts: WorkoutSession[] = [];

// Get all workouts
router.get("/workouts", (req, res) => {
    res.json(workouts);
});

// Get a specific workout by ID
router.get("/workouts/:id", (req, res) => {
    const workout = workouts.find(w => w.id === req.params.id);
    if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
});

// Create a new workout
router.post("/workouts", (req, res) => {
    const newWorkout: WorkoutSession = { id: Date.now().toString(), ...req.body };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

// Update a workout
router.put("/workouts/:id", (req, res) => {
    const index = workouts.findIndex(w => w.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Workout not found" });
    }
    workouts[index] = { ...workouts[index], ...req.body };
    res.json(workouts[index]);
});

// Delete a workout
router.delete("/workouts/:id", (req, res) => {
    const index = workouts.findIndex(w => w.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Workout not found" });
    }
    workouts.splice(index, 1);
    res.status(204).send();
});

export default router;
