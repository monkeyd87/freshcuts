import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoose";
import {User} from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth")?.value;
    if (!token) return Response.json({ user: null }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    await connectDB();
    const user = await User.findById(decoded.id).select("-passwordHash");
    console.log("Fetched user data:", user);

    return Response.json(user);
  } catch {
    return Response.json({ user: null }, { status: 401 });
  }
}
