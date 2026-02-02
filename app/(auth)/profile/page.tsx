import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { User } from "@/models/User";
import { connectDB } from "@/lib/mongoose";

export default async function ProfilePage() {
  await connectDB();

  const token = await cookies().get("auth")?.value!;
  const payload = verifyToken(token);

  const user = await User.findById(payload.id).select("-passwordHash");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
