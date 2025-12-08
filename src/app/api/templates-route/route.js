// import dbConnect from "@/lib/db";
// import Template from "@/models/Template";
import { connectDB } from "./../../../../lib/db";
import Template from "./../../../../models/Tamplete";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { name, slug, layout, previewData } = body;

  if (!name || !slug) {
    return new Response(
      JSON.stringify({ error: "Name and slug required" }),
      { status: 400 }
    );
  }

  const exists = await Template.findOne({ slug });
  if (exists) {
    return new Response(
      JSON.stringify({ error: "Slug already exists" }),
      { status: 409 }
    );
  }

  const template = await Template.create({
    name,
    slug,
    layout,
    previewData
  });

  return new Response(JSON.stringify({ template }), { status: 201 });
}
