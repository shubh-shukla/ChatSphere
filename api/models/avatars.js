import mongoose from "mongoose";

const AvatarSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      default: "https://i.imgur.com/qGsYvAK.png",
    },
  },
  { timestamps: true }
);

export const Avatar = mongoose.model("Avatar", AvatarSchema);
