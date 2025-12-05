import User from "../../../../../models/User";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";

export async function POST(req) {
  try {
    await connectDB();

    const { username } = await req.json();
    console.log("Username:", username);

    // Validate empty input
    if (!username || username.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Username is required" },
        { status: 400 }
      );
    }

    // Check if username exists properly
    const existingUser = await User.findOne({ username: username.trim() });

    if (!existingUser) {
      return NextResponse.json(
        { success: true, message: "Username available", exists: false },
        { status: 200 }
      );
    }
    if (existingUser) {
      return NextResponse.json(
        { success: true, message: "Username available", exists: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Username available", exists: false },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
