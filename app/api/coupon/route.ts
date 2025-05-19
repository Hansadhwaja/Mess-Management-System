import { connectDB } from "@/lib/db";
import Coupon from "@/lib/models/couponModel";
import { User } from "@/lib/models/userModel";
import { verifyCouponData } from "@/lib/utils/verifyCouponData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { userId, week, day, meal } = await request.json();

    const dbUser = await User.findOne({ clerkId: userId });
    const coupon = await Coupon.findOne({ userId: dbUser?._id, week, day, meal, used: false });

    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Coupon invalid or already used" });
    }

    const isVerifiedCouponData = await verifyCouponData({ week, day, meal });

    if (!isVerifiedCouponData) {
      return NextResponse.json({ valid: false, message: "Invalid week or day or meal timing" });
    }

    coupon.used = true;
    coupon.usedAt = new Date();
    await coupon.save();

    return NextResponse.json({ valid: true, message: "Coupon verified and marked as used" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ valid: false, error: "Server error" }, { status: 500 });
  }
}
