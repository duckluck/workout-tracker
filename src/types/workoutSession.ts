export type WorkoutSet = {
    weight: number; // Weight lifted in kg
    reps: number;   // Number of repetitions
};

export type WorkoutExercise = {
    name: string;        // Exercise name (e.g., "Bench Press")
    sets: WorkoutSet[];  // List of sets for this exercise
};

export type WorkoutSession = {
    id: string;            // Unique ID for the session
    date: string;          // Date of workout in ISO format
    exercises: WorkoutExercise[]; // List of exercises in the session
};
