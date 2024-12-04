import "reflect-metadata";
import { getEnvVariable } from "./utils/db/envControl";
import app from "./app";
import mongoose from "mongoose";

const dbHost = getEnvVariable("DB_HOST");
const dbPort = getEnvVariable("DB_PORT");
const dbName = getEnvVariable("DB_NAME");
const serverPort = getEnvVariable("SERVER_PORT");

mongoose.set("debug", true);
mongoose
  .connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)
  .then((_) => {
    app.listen(`${serverPort}`, () => {
      console.log(`Server started on port ${serverPort}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
