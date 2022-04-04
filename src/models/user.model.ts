import mongoose, { Schema, Document, model, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  compairePassword(passowrd: string): Promise<boolean>;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      minlength: 4,
      maxlength: 8,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    }
  }
});

userSchema.methods.compairePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password).catch((e) => false);

  //   also you can do this like this way
  // bcrypt.compare(password, this.password, (err, success) => {
  //   if (err) {
  //     return next(err, null);
  //   }
  //   next(null, success);
  // });
};

export default model<IUser>("User", userSchema);
