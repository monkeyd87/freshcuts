import { connectDB } from "@/lib/mongoose";
import { Service } from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const service = await Service.findById(params.id).lean();

        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        return NextResponse.json(service, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const data = await req.json();

        const service = await Service.findByIdAndUpdate(params.id, data, {
            new: true,
            runValidators: true,
        });

        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        return NextResponse.json(service, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const service = await Service.findByIdAndDelete(params.id);

        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Service deleted" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
