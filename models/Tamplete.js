import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },

  layout: {
    background: String,
    textColor: String,
    buttonBg: String,
    buttonText: String,
    buttonRadius: String,
    font: String
  },

  previewData: {
    name: String,
    bio: String,
    avatar: String
  },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Template ||
  mongoose.model("Template", TemplateSchema);
