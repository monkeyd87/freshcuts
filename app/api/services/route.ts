import { connectDB } from "@/lib/mongoose";
import { Service } from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const shopId = searchParams.get("shopId");
        const barberId = searchParams.get("barberId");
        const category = searchParams.get("category");

        let query: any = {};
        if (shopId) query.shop = shopId;
        if (barberId) query.barber = barberId;
        if (category) query.category = category;

        const services = await Service.find(query).lean();
        return NextResponse.json(services, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.name || !data.price || !data.duration || !data.shop) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const service = await Service.create(data);
        return NextResponse.json(service, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
