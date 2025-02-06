// src/api/api.ts
import axios from 'axios';

const API_URL = 'http://duckluck11.duckdns.org:3000'; // Replace with the correct server IP or domain

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all workouts
export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts');
    return response.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

// Add a new workout session
export const createWorkout = async (workoutData: any) => {
  try {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};
