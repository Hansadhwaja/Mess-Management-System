import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    meal: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
}, { timestamps: true, versionKey: false });
export const Time = mongoose.models.Time || mongoose.model("Time", timeSchema);