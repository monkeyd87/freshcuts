import { connectDB } from "@/lib/mongoose";
import { AiPreview } from "@/models/AiPreview";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("auth")?.value;
        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token);
        const previews = await AiPreview.find({ user: payload.id }).sort({ createdAt: -1 }).lean();

        return NextResponse.json(previews, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("auth")?.value;
        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const payload = verifyToken(token);
        const { originalImageUrl, styleRequested } = await req.json();

        if (!originalImageUrl || !styleRequested) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const preview = await AiPreview.create({
            user: payload.id,
            originalImageUrl,
            styleRequested,
            status: "pending",
        });

        // In a real app, you'd trigger an async AI process here (e.g., replicate, openai, custom engine)

        return NextResponse.json(preview, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
