import express from "express";
import cors from "cors";
import workoutRoutes from "./api";

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests
app.use("/api", workoutRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
