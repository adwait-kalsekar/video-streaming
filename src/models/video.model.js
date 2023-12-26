import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoFile: {
      type: String, // Video URL
      required: true,
    },
    thumbNail: {
      type: String, // Image URL
      required: true,
    },
    description: {
      type: String, // from thirdparty video service
      required: true,
    },
    duration: {
      type: Number, // from thirdparty video service
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
