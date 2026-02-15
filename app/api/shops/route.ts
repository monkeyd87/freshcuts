import { connectDB } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const ownerId = searchParams.get("ownerId");

        let query: any = {};
        if (ownerId) query.owner = ownerId;

        const shops = await Shop.find(query).lean();
        return NextResponse.json(shops, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.name || !data.owner || !data.address) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const shop = await Shop.create(data);
        return NextResponse.json(shop, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
