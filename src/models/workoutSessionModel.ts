// src/models/workoutSessionModel.ts
import { WorkoutSession } from "../types/workoutSession";

// Temporary in-memory storage for workout sessions (can be replaced with a database later)
let workoutSessions: WorkoutSession[] = [];

export const getWorkoutSessions = (): WorkoutSession[] => {
    return workoutSessions;
};

export const addWorkoutSession = (session: WorkoutSession): void => {
    workoutSessions.push(session);
};

export const getWorkoutSessionById = (id: string): WorkoutSession | undefined => {
    return workoutSessions.find(session => session.id === id);
};
