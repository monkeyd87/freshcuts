import { Schema, model, models, type Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "barber" | "client";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarUrl?: string;
  stripeCustomerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/.+@.+\..+/, "Invalid email address"],
    },

    // ✅ Store only the hash
    passwordHash: { type: String, required: true, },

    role: {
      type: String,
      enum: ["barber", "client"],
      default: "client",
      required: true,
    },

    avatarUrl: { type: String },
    stripeCustomerId: { type: String, index: true },
  },
  { timestamps: true }
);

// ✅ Instance method for login
UserSchema.method("comparePassword", function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
});

export const User =
  (models.User as UserModel) || model<IUser, UserModel>("User", UserSchema);
