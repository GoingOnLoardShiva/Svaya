import { NextResponse } from "next/server";
import { connectDB } from "./../../../../lib/db";
import User from "./../../../../models/User";



export async function POST(req) {
  try {
    const { username } = await req.json();

    await connectDB();

    const user = await User.findOne({ username }).select(
      "username email uuid"
    );

    if (!user) {
      return NextResponse.json(
        { success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
