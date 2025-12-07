import { connectDB } from "../../../../../lib/db";
import Layout from "../../../../../models/user-acces/layout";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { order } = await req.json(); // array of { layout_uid, position }

    if (!order || !Array.isArray(order)) {
      return new Response(JSON.stringify({ success: false, message: "Invalid order" }), { status: 400 });
    }

    await connectToDB(); // connect to MongoDB

    // Loop through each item and update its position
    const updatePromises = order.map(item =>
      LayoutModel.updateOne(
        { layout_uid: item.layout_uid },
        { $set: { position: item.position } }
      )
    );

    await Promise.all(updatePromises);

    return new Response(JSON.stringify({ success: true, message: "Layout order updated" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 500 });
  }
}
