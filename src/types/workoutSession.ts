// src/types/workoutSession.ts

export type Set = {
    weight: number; // Weight in kilograms
    reps: number;   // Number of repetitions
};

export type Exercise = {
    name: string;   // Exercise name, e.g., "Squat"
    sets: Set[];    // Array of sets for this exercise
};

export type WorkoutSession = {
    id: string;                // Unique ID for the session
    date: string;              // Date of the session
    durationMinutes: number;   // Duration of the session in minutes
    exercises: Exercise[];     // Array of exercises performed
};
