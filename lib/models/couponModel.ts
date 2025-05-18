import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    week: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    meal: {
        type: String,
        required: true,
        enum: ["breakfast", "lunch", "dinner"],
    },
    used: {
        type: Boolean,
        default: false,
    },
    usedAt: {
        type: Date,
    },
}, { timestamps: true, versionKey: false });

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export default Coupon;
