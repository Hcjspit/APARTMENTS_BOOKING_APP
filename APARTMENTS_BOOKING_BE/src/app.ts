import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import apiRouter from "./api/routes";
import "./utils/middlewares/auth/local/local-strategy";
import passport from "passport";
const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api", apiRouter);

export default app;
