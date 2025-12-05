import { connectDB } from "./../../../../lib/db";
import User from "./../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, category,username } = await req.json();

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const GeneratedId = uuid();

    // Create user
    const newUser = await User.create({
      uuid: GeneratedId,
      username,
      email,
      password: hashedPassword,
      category,
      createdAt: Date.now(),
    });

    // Create JWT
    const token = jwt.sign(
      { id: newUser.uuid, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ⭐ FIXED: cookies() must be awaited
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      message: "Registration Successful",
      userId: newUser.uuid,
      role: newUser.role,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
