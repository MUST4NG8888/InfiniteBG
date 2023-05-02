import mongoose from "mongoose";
import { Schema, InferSchemaType } from "mongoose";

const PlaysSchema = new Schema(
  {
    date: Date,
    gameTitle: String,
    gameId: Number,
    playerNumber: Number,
    players: [
      {
        name: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        points: Number,
        colour: String,
        position: Number,
      },
    ],
    title: String,
    description: String,
    location: String,
  },
  {
    timestamps: true,
  }
);

export type PlayType = InferSchemaType<typeof PlaysSchema>;
export const Play = mongoose.model("Play", PlaysSchema);
