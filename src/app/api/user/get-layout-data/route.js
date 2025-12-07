import { connectDB } from "../../../../../lib/db";
import Layout from "../../../../../models/user-acces/layout";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();

    const { uuid } = await req.json();
    console.log("UUID RECEIVED 👉", uuid);

    if (!uuid) {
      return NextResponse.json(
        { success: false, message: "User id required" },
        { status: 400 }
      );
    }

    const layouts = await Layout.find({ useruuid:uuid });

    console.log("LAYOUTS FOUND 👉", layouts.length);

    return NextResponse.json({
      success: true,
      data: layouts,
    });
  } catch (error) {
    console.error("ERROR 👉", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
