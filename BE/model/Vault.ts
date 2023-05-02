import mongoose from "mongoose";
import { Schema, InferSchemaType } from "mongoose";

const VaultSchema = new Schema(
  {
    favourites: { type: [Number], required:false, default:[] },
    whisList: { type: [Number], required:false, default:[] },
    owned: { type: [Number], required:false, default:[]  },
    wantToBuy: { type: [Number], required:false, default:[]  },
    wantToPlay: { type: [Number], required:false, default:[]  },
    forTrade: { type: [Number], required:false, default:[]  },
  },
  {
    timestamps: true,
  }
);

export type VaultType = InferSchemaType<typeof VaultSchema>;
export const Vault = mongoose.model("Vault", VaultSchema);
