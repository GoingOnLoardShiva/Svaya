import mongoose from "mongoose";

const layoutSchema = new mongoose.Schema(
  {
    // remove unique from uuid field
    useruuid: { type: String, required: true },
    layout_uid: { type: String, required: true },
    position: { type: Number, default: 0 },
    platform: { type: String, required: true },
    avtar: { type: String },
    platform_Tittle: { type: String },
    platform_link: { type: String },
    platform_logo: { type: String },
    platform_clicks: { type: Number, default: 0 },
    layout_active: { type: Boolean, default: true },
    layout_color: { type: String },

    product_id: { type: String },
    product_title: { type: String },
    product_price: { type: Number },
    product_thubnail: { type: String },
    product_images: { type: Array },
    product_link: { type: String },

    App_id: { type: String },
    App_Name: { type: String },
    App_Logo: { type: String },
    App_Link: { type: String },
    App_Description: { type: String },
    App_file:{type:String},
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in Next.js
export default mongoose.models.Layout || mongoose.model("Layout", layoutSchema);
