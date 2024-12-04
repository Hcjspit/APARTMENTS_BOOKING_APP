import express from "express";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
