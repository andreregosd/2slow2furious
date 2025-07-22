import express from "express";
import cors from "cors";

import seasonsController from "./controllers/seasonsController.js";
import driversController from "./controllers/driversController.js";
import teamsController from "./controllers/teamsController.js";
import racesController from "./controllers/racesController.js";
import resultsController from "./controllers/resultsController.js";
import standingsController from "./controllers/standingsController.js";
import scoreboardsController from "./controllers/scoreboardsController.js";

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Controllers
app.use("/api/seasons", seasonsController);
app.use("/api/drivers", driversController);
app.use("/api/teams", teamsController);
app.use("/api/races", racesController);
app.use("/api/results", resultsController);
app.use("/api/standings", standingsController);
app.use("/api/scoreboards", scoreboardsController);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).send('Internal Server Error');
});

// Process-level error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
