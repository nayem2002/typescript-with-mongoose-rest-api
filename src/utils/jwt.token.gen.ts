import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
// import { config } from "dotenv";

// const secret  = process.env.JWT_SECRET;
// config({ path: `${__dirname}/../config.env` });

// console.log(process.env.JWT_SECRET, "jwt secret");

export function signJwt(user: IUser, secret: jwt.Secret) {
  return jwt.sign({ id: user._id }, secret, {
    expiresIn: "2d",
  });
}

export async function verifyJwt(token: string, secret: jwt.Secret) {
  try {
    const decoded = jwt.verify(token, secret);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        valid: false,
        expired: error.message === "jwt expired",
        decoded: null,
      };
    }
  }
}
