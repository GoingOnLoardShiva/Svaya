import { connectDB } from "./../../../../../lib/db";
import Layout from "./../../../../../models/user-acces/layout";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Connect DB
    await connectDB();

    // ✅ Read request body
    const { uuid } = await req.json();

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    // ✅ Find user active layout
    const layoutData = await Layout.find({
      useruuid: uuid,
      layout_active: true,
    })
      .select(
        `
    position
    platform
    platform_Tittle
    platform_link
    platform_logo
    layout_color
    platform_clicks

    product_title
    product_price
    product_thubnail
    product_images
    product_link

    App_Name
    App_Logo
    App_Link
    App_Description

    -_id
  `
      )
      .sort({ position: 1 })
      .lean();

    if (!layoutData) {
      return NextResponse.json({ error: "Layout not found" }, { status: 404 });
    }

    // ✅ Success response
    return NextResponse.json(layoutData, { status: 200 });
  } catch (error) {
    console.error("GET LAYOUT ERROR:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
