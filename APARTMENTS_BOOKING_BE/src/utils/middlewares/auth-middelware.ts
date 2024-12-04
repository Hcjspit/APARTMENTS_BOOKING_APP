import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getEnvVariable } from "../db/envControl";

const jwtSecret = getEnvVariable("JWT_SECRET");

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied, No token provided." });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    (req).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};
