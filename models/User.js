import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      lowercase: true,
    },
    email: { type: String, required: true, unique: true ,lowercase: true,trim: true,},
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    category: { type: String },
    plan:{type:String,default:"free"},
    activeTemplateId:{type:String,default:"default"}
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
