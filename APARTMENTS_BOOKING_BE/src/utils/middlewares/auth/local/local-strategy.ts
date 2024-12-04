import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserIdentityModel } from "./user-identity.model";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      console.log("Local strategy triggered with username:", username);
      try {
        const identity = await UserIdentityModel.findOne({
          "credentials.username": username,
        });
        if (!identity) {
          console.log("User not found");
          return done(null, false, {
            message: `username ${username} not found`,
          });
        }

        const isMatch = await bcrypt.compare(
          password,
          identity.credentials.hashedPassword
        );
        if (isMatch) {
          console.log("Authentication successful");
          return done(null, identity.toObject().user);
        }
        done(null, false, { message: "invalid password" });
      } catch (err) {
        console.error("Error in strategy:", err);
        done(err);
      }
    }
  )
);
