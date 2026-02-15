import { connectDB } from "@/lib/mongoose";
import { Subscription } from "@/models/Subscription";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("auth")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const payload = verifyToken(token);
        const subscription = await Subscription.findOne({ user: payload.id }).lean();

        if (!subscription) {
            return NextResponse.json({ plan: "none", status: "none" }, { status: 200 });
        }

        return NextResponse.json(subscription, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
