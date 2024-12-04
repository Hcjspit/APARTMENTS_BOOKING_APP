import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { RegisterUserDTO } from "../dto/user.dto";
import { omit, pick } from "lodash";
import userService from "../services/user.service";
import emailService from "../services/email.service";
import { UserExistsError } from "../../errors/user-exists";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { getEnvVariable } from "../../utils/db/envControl";
import { User } from "../entities/user.entity";

export const register = async (
  req: TypedRequest<RegisterUserDTO>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password, confirmPassword, ...userData } = req.body;

    const userDto = new RegisterUserDTO();
    console.log(userDto);

    Object.assign(userDto, { ...userData, password, confirmPassword });

    userDto.validatePasswordMatch();

    const user = {
      ...omit(userDto, "password", "confirmPassword"),
      isConfirmed: false,
      profileImage: userDto.profileImage,
    };
    console.log(user);

    const credentials = pick(userDto, "username", "password");

    const newUser = await userService.register(user, credentials);

    emailService.sendConfirmationEmail(newUser.username, newUser.id!);

    res.send(newUser);
  } catch (error) {
    if (error instanceof UserExistsError) {
      res.status(400).json({
        error: "UserExistsError",
        message: "username already in use. Please try a different one.",
      });
    } else if (
      error instanceof Error &&
      error.message === "Password and confirm password do not match."
    ) {
      res.status(400).json({
        error: "PasswordMismatch",
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

export const me = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  res.json(req.user!);
};

export const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send("Missing token");
  }

  try {
    const key = getEnvVariable("EMAIL_SECRET");
    const { userId } = jwt.verify(token, key!) as JwtPayload;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isConfirmed = true;
    await user.save();
    return res.status(200).send("Email confirmed successfully");
  } catch (err) {
    return res.status(400).send("Invalid or expired token");
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user! as User;

    const { newPassword, confirmPassword } = req.body;

    const updatedUser = await userService.updatePassword(
      user,
      newPassword,
      confirmPassword
    );

    res.json(updatedUser);
    res.status(200);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const list = await userService.list();

  res.json(list);
};
