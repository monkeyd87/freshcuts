import { connectDB } from "@/lib/mongoose";
import { Appointment } from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const clientId = searchParams.get("clientId");
        const barberId = searchParams.get("barberId");
        const shopId = searchParams.get("shopId");

        let query: any = {};
        if (clientId) query.client = clientId;
        if (barberId) query.barber = barberId;
        if (shopId) query.shop = shopId;

        const appointments = await Appointment.find(query)
            .populate("client", "name email avatarUrl")
            .populate("barber", "name email avatarUrl")
            .populate("service", "name price duration")
            .populate("shop", "name address")
            .sort({ startTime: 1 })
            .lean();

        return NextResponse.json(appointments, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data = await req.json();

        const { client, barber, service, shop, startTime, endTime, notes, recurring, recurringFrequency } = data;

        if (!client || !barber || !service || !shop || !startTime || !endTime) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const appointment = await Appointment.create({
            client,
            barber,
            service,
            shop,
            startTime,
            endTime,
            notes,
            recurring,
            recurringFrequency,
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
