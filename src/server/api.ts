// src/server/api.ts
import express from "express";
import { getWorkoutSessions, addWorkoutSession, getWorkoutSessionById } from "../models/workoutSessionModel";
import { WorkoutSession } from "../types/workoutSession";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Route to get all workout sessions
app.get("/api/workout-sessions", (req, res) => {
    res.json(getWorkoutSessions());
});

// Route to add a new workout session
app.post("/api/workout-sessions", (req, res) => {
    const newSession: WorkoutSession = req.body;
    addWorkoutSession(newSession);
    res.status(201).json(newSession);
});

// Route to get a workout session by ID
app.get("/api/workout-sessions/:id", (req, res) => {
    const session = getWorkoutSessionById(req.params.id);
    if (session) {
        res.json(session);
    } else {
        res.status(404).send("Workout session not found");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
