import { User } from "../../../../api/entities/user.entity";

export interface UserIdentity {
  provider: "local";
  credentials: {
    username: string;
    hashedPassword: string;
  };
  user: User;
}
