import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import {User} from "@/models/User"
import { userAgent } from "next/server";
import { signToken } from "@/lib/auth";





// sign up
export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    // ✅ Hash here (reliable in Next.js)
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role ?? "client",
    });


    const token = signToken({
    id: user._id.toString(),
    role: user.role,
  });

    

    // ✅ Never return passwordHash
    const response =  Response.json(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      { status: 201 }


    );

    response.headers.set(
      "Set-Cookie",
      `auth=${token}; HttpOnly; Path=/; Max-Age=604800`
    )
    return response

  } catch (err: any) {
    console.error(err);

    // Duplicate email (unique index)
    if (err?.code === 11000) {
      return Response.json({ message: "Email already exists" }, { status: 409 });
    }

    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
