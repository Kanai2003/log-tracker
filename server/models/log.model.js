import mongoose, { Schema } from "mongoose";

const logSchema = new mongoose.Schema({
  actionType: {
    type: String,
    // required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  role: {
    type: String,
  },
  additionalData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
    timestamps: true
});

export const Log = mongoose.model("Log", logSchema);
