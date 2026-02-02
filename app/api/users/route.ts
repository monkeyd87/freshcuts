import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import {User} from "@/models/User"
import { userAgent } from "next/server";

export async function GET(){
    try{
        const conn = await connectDB()
        const users = await User.find()
        .select('-passwordHash')
        .lean()
        if(users.length === 0) return Response.json({message:'No Users Found!!!'},{status:400})
        return Response.json(users,{status:200})

    }catch(err){
        console.log(err)
       return Response.json({message:'server error'},{status:500})
    }
}



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

    // ✅ Never return passwordHash
    return Response.json(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);

    // Duplicate email (unique index)
    if (err?.code === 11000) {
      return Response.json({ message: "Email already exists" }, { status: 409 });
    }

    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
