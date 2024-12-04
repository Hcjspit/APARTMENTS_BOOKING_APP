import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import logService from "../services/log.service";
import { LoginDTO } from "../dto/auth.dto";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../../utils/middlewares/auth/jwt/jwt-strategy";

export const login = async (
  req: TypedRequest<LoginDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const authMiddelware = passport.authenticate("local", (err, user, info) => {
      if (err) {
        next(err);
        logService.add("Login Error", false);
        return;
      }

      if (!user) {
        console.log(user);
        logService.add(`Login - ${info.message}`, false);
        res.status(401);
        res.json({
          error: "LoginError",
          message: info.message,
        });
        return;
      }

      if (!user.isConfirmed) {
        logService.add(`Login - Email not Confirmed`, false);
        res.status(401);
        res.json({
          error: "LoginError",
          message: "email not confirmed",
        });
        return;
      }

      const token = jwt.sign(user, jwtSecret, { expiresIn: "1h" });
      logService.add("Login", true);

      res.status(200);

      res.json({
        user,
        token,
      });
    });
    authMiddelware(req, res, next);
  } catch (err) {
    next(err);
  }
};
