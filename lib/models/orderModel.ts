import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  week: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
}, { timestamps: true, versionKey: false });
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;