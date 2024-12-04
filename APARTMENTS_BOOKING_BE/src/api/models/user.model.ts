import mongoose from "mongoose";
import { User as IUser } from "../entities/user.entity";

export const userSchema = new mongoose.Schema<IUser>({
  firstName: String,
  lastName: String,
  username: String,
  residence:String,
  profileImage: String,
  isConfirmed: { type: Boolean, default: false },
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.isConfirmed;
    return ret;
  },
});

userSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
