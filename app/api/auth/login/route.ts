import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({
    id: user._id.toString(),
    role: user.role,
  });

  const response = Response.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  response.headers.set(
    "Set-Cookie",
    `auth=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`
  );

  return response;
}
