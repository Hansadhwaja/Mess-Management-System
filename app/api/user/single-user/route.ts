import { NextResponse } from "next/server";
import { getUser } from "@/lib/actions/userActions";

export async function POST(req: Request) {
    const { clerkId } = await req.json();
    const user = await getUser({ clerkId });

    return NextResponse.json({
        id: user?.id,
        role: user?.role,
    });
}
