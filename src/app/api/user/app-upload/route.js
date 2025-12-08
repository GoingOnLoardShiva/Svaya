import { connectDB } from "../../../../../lib/db";
import Layout from "../../../../../models/user-acces/layout";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await connectDB();

    const {
      uuid,
      name,
      description,
      logo,
      link,
      file,
      type, // "link" | "file"
    } = await req.json();

    // ✅ Basic validation
    if (!uuid || !name || !type) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    // ✅ Validate link / file
    if (type === "link" && !link) {
      return NextResponse.json(
        { success: false, message: "App link is required" },
        { status: 400 }
      );
    }

    if (type === "file" && !file) {
      return NextResponse.json(
        { success: false, message: "App file is required" },
        { status: 400 }
      );
    }

    // ✅ Create app
    const app = await Layout.create({
      useruuid: uuid,
      App_id: uuidv4(),
      layout_uid: uuidv4(),
      platform:"app",

      App_Name: name,
      App_Description: description || "",
      App_Logo: logo || "",

      App_Type: type,          // link | file
      App_Link: type === "link" ? link : "",
      App_file: type === "file" ? file : "",
    });

    return NextResponse.json({ success: true, app });

  } catch (error) {
    console.error("APP CREATE ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
