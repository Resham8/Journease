import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models";
import bcrypy from  "bcrypt";

connectDB();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const hashedPwd = await bcrypy.hash(body.password,10)
    // console.log("Registering user:", body);
    const user = await User.create({
      name:body.fullName,
      email:body.email,
      password:hashedPwd
    })  

    return NextResponse.json({ message: "User registered",  user });
  } catch (e) {
    console.error({ e });
  }
}
