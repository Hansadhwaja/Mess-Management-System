
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/userModel";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, name, email, image } = body;

        if (!email || !id) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ clerkId: id });

        if (!existingUser) {
            await User.create({
                clerkId: id,
                name,
                email,
                image,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
