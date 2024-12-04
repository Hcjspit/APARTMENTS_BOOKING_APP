import mongoose from "mongoose";
import { Log as ILog } from "../entities/log.entity";

export const logSchema = new mongoose.Schema<ILog>({
  date: Date,
  description: String,
  ipAddress: String,
  result: Boolean,
});

logSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

logSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const LogModel = mongoose.model<ILog>("Log", logSchema);
