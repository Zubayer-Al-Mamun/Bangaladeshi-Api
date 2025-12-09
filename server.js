import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import Division from "./model/allDivision.js";
import District from "./model/districts.js";
import Union from "./model/union.js";
import Upazila from "./model/Upazila.js";

import compression from "compression";

const app = express();
app.use(compression());

// Load .env
dotenv.config({
    path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env"),
});

// DB CONNECT
export const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            maxPoolSize: 30,
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};
connectDB(`${process.env.MONGO_URI}/bd`);

// ==================== ROUTES ====================

// Get unions by upazila
app.get("/unions/:upazila", async (req, res) => {
    try {
        const upazila = req.params.upazila;

        if (!upazila) {
            return res
                .status(400)
                .json({ message: "Upazila name is required." });
        }

        const upazilaObj = await Upazila.findOne({
            name: { $regex: new RegExp(`^${upazila}$`, "i") },
        }).lean();

        if (!upazilaObj) {
            return res.status(404).json({
                message:
                    "The specified upazila does not exist / এই নামে কোনো উপজেলা নেই।",
            });
        }

        const unions = await Union.find({ upazila_id: upazilaObj._id }).lean();
        return res.status(200).json(unions);
    } catch (err) {
        console.error("Upazila fetching error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get upazilas by district
app.get("/upazilas/:district", async (req, res) => {
    try {
        const { district } = req.params;

        if (!district) {
            return res
                .status(400)
                .json({ message: "District name is required." });
        }

        const districtObj = await District.findOne({
            name: { $regex: new RegExp(`^${district}$`, "i") },
        }).lean();

        if (!districtObj) {
            return res.status(404).json({
                message:
                    "The specified district does not exist / এই নামে কোনো জেলা নেই।",
            });
        }

        const upazilas = await Upazila.find({ district_id: districtObj._id });
        return res.status(200).json(upazilas);
    } catch (err) {
        console.error("Upazila fetching error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get districts by division
app.get("/districts/:division", async (req, res) => {
    try {
        const { division } = req.params;

        if (!division) {
            return res
                .status(400)
                .json({ message: "Division name is required." });
        }

        const divisionObj = await Division.findOne({
            name: { $regex: new RegExp(`^${division}$`, "i") },
        }).lean();

        if (!divisionObj) {
            return res.status(404).json({
                message:
                    "The specified division does not exist / এই নামে কোনো বিভাগ নেই।",
            });
        }

        const districts = await District.find({ division_id: divisionObj._id }).lean();
        return res.status(200).json(districts);
    } catch (err) {
        console.error("District fetching error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get all Unions
app.get("/unions", async (req, res) => {
    try {
        const result = await Union.find({}).lean();
        return res.status(200).json(result);
    } catch (err) {
        console.error("Union fetching error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get all Upazilas
app.get("/upazilas", async (req, res) => {
    try {
        const result = await Upazila.find({}).lean();
        return res.status(200).json(result);
    } catch (err) {
        console.error("Upazilas fetching error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get all Districts
app.get("/districts", async (req, res) => {
    try {
        const result = await District.find({}).lean();
        return res.status(200).json(result);
    } catch (err) {
        console.error("Districts fetching error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get all Divisions
app.get("/divisions", async (req, res) => {
    try {
        const result = await Division.find({}).lean();
        return res.status(200).json(result);
    } catch (err) {
        console.error("Divisions fetching error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Root route / redirect
app.get("/", (req, res) => {
    return res.status(200).send("API is running...");
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server is running on port:", process.env.PORT);
});
