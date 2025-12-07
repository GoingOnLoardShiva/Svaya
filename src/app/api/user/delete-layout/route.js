import { connectDB } from "../../../../../lib/db";
import Layout from "../../../../../models/user-acces/layout";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { layout_uid } = await req.json();
    if (!layout_uid) return NextResponse.json({ success: false, message: "layout_uid required" }, { status: 400 });

    const updated = await Layout.findOneAndUpdate({ layout_uid }, { $set: { deleted: true } }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
