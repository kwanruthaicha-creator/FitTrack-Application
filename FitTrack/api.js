
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// เก็บข้อมูลล่าสุดจาก ESP32
let latestData = {
    device: "FitTrack",
    mode: "SIMULATION",
    machine: "Chest Press",
    reps: 0,
    sets: 0,
    duration: 0,
    connected: false,
    updatedAt: null
};

// ตรวจสอบว่า API ทำงานอยู่
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "FitTrack API is running",
        data: latestData
    });
});

// รับข้อมูลจาก ESP32
app.post("/api/workout", (req, res) => {
    const { machine, reps, sets, duration, mode } = req.body;

    if (
        typeof machine !== "string" ||
        !Number.isFinite(reps) ||
        !Number.isFinite(sets) ||
        !Number.isFinite(duration)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid workout data"
        });
    }

    latestData = {
        device: "FitTrack",
        mode: mode === "HARDWARE" ? "HARDWARE" : "SIMULATION",
        machine,
        reps,
        sets,
        duration,
        connected: true,
        updatedAt: new Date().toISOString()
    };

    res.json({
        success: true,
        message: "Workout data received",
        data: latestData
    });
});

// ให้หน้าเว็บเรียกดูข้อมูลล่าสุด
app.get("/api/workout", (req, res) => {
    res.json({
        success: true,
        data: latestData
    });
});

// เริ่ม Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`FitTrack API running on port ${PORT}`);
});
