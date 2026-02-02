import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    // Explicitly select passwordHash
    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Never return passwordHash
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    console.log("User logged in:", safeUser);
    return Response.json(safeUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

