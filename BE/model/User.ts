import mongoose from "mongoose";
import { Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    avatar: String,
    subs: { type: [String], required: true, unique: true },
    email: { type: String, required: true },
    accessToken: String,
    profile: {
      name: String,
      firstName: String,
      lastName: String,
      bio: String,
      dateofbirth: Number
    },
    role: { type: String, default: "user" },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: false,
      },
    ],
    friendzone: {
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
      ],
      invited: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
      ],
    },
    plays: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Play",
        required: false,
      },
    ],
    vault: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vault",
      required: false,
    },
    active: { type: Boolean, default: true, required: false },
  },
  {
    timestamps: true,
  }
);

export type UserType = InferSchemaType<typeof UserSchema>;
export const User = mongoose.model("User", UserSchema);
