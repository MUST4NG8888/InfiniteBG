import mongoose from "mongoose";
import { Schema, InferSchemaType } from "mongoose";

const EventSchema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    title: String,
    summary: String,
    description: String,
    location: String,
    public: { type: Boolean, default: false },
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    invited: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    interested: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    going: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export type EventType = InferSchemaType<typeof EventSchema>;
export const Event = mongoose.model("Event", EventSchema);
