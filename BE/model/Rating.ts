import mongoose from "mongoose";
import { Schema, InferSchemaType } from "mongoose";

const RatingSchema = new Schema(
  {
    ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    reviewTitle: String,
    review: String,
  },
  {
    timestamps: true,
  }
);

export type RatingType = InferSchemaType<typeof RatingSchema>;
export const Rating = mongoose.model("Rating", RatingSchema);
