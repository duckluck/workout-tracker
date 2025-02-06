import Database from "better-sqlite3";
import { WorkoutSession } from "../types/workoutSession";

const db = new Database("workout-tracker.db");

// Create the table if it doesn't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS workout_sessions (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exercise_id INTEGER NOT NULL,
        weight REAL NOT NULL,
        reps INTEGER NOT NULL,
        FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
    )
`).run();

// Insert a new workout session
export const createWorkout = (session: WorkoutSession) => {
    const insertSession = db.prepare("INSERT INTO workout_sessions (id, date) VALUES (?, ?)");
    insertSession.run(session.id, session.date);

    for (const exercise of session.exercises) {
        const insertExercise = db.prepare("INSERT INTO exercises (session_id, name) VALUES (?, ?)");
        const exerciseResult = insertExercise.run(session.id, exercise.name);

        for (const set of exercise.sets) {
            const insertSet = db.prepare("INSERT INTO sets (exercise_id, weight, reps) VALUES (?, ?, ?)");
            insertSet.run(exerciseResult.lastInsertRowid, set.weight, set.reps);
        }
    }
};

// Fetch all workout sessions
export const getAllWorkouts = (): WorkoutSession[] => {
    const sessions = db.prepare("SELECT * FROM workout_sessions").all();
    return sessions.map(session => {
        const exercises = db.prepare("SELECT * FROM exercises WHERE session_id = ?").all(session.id);
        return {
            ...session,
            exercises: exercises.map(exercise => ({
                ...exercise,
                sets: db.prepare("SELECT * FROM sets WHERE exercise_id = ?").all(exercise.id)
            }))
        };
    });
};

// Get a single workout by ID
export const getWorkoutById = (id: string): WorkoutSession | null => {
    const session = db.prepare("SELECT * FROM workout_sessions WHERE id = ?").get(id);
    if (!session) return null;

    const exercises = db.prepare("SELECT * FROM exercises WHERE session_id = ?").all(session.id);
    return {
        ...session,
        exercises: exercises.map(exercise => ({
            ...exercise,
            sets: db.prepare("SELECT * FROM sets WHERE exercise_id = ?").all(exercise.id)
        }))
    };
};

// Delete a workout session
export const deleteWorkout = (id: string) => {
    db.prepare("DELETE FROM workout_sessions WHERE id = ?").run(id);
};
