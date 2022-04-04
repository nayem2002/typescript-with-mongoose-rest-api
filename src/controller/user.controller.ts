import { Request, Response, NextFunction, RequestHandler } from "express";
import User, { IUser } from "../models/user.model";
import { signJwt } from "../utils/jwt.token.gen";
import { config } from "dotenv";
import { registerSchema, loginSchema } from "../validator/user.validation";

config({ path: `${__dirname}/../../config.env` });

const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (!name || !email || !password) {
    //   return next(new Error("All faild are required"));
    // }

    const result: IUser = await registerSchema.validateAsync(req.body);

    const { name, email, password } = result;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return next(new Error("Email already exist"));
    }

    let user = new User({
      result,
    });

    await user.save();

    const token = signJwt(user, secret);

    res.status(200).json({
      success: true,
      message: "User Registion Successfull",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginSchema.validateAsync(req.body);

    const { email, password } = result;

    const findUser = await User.findOne({ email }).select("+password");
    if (!findUser) {
      return next(new Error("User can not exist"));
    }

    const isMatchPassword = await findUser.compairePassword(password);
    if (!isMatchPassword) {
      return next(new Error("Invalid Creadintils"));
    }
    const token = signJwt(findUser, secret);

    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      next(error);
    }
    // next(InternalServerError);
  }
};

const getAllUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    }
  }
};

export { createUser, loginUser, getAllUser };
