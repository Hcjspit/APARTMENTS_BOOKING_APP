import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { UserModel } from "../../../../api/models/user.model";
import { getEnvVariable } from "../../../db/envControl";

export const jwtSecret = getEnvVariable("JWT_SECRET");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    async (token, done) => {
      try {
        const user = await UserModel.findById(token.id);
        if (user) {
          return done(null, user.toObject());
        } else {
          return done(null, false, { message: "invalid token" });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);
