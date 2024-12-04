import { IsEmail, Matches, MinLength } from "class-validator";

export class LoginDTO {
  @IsEmail()
  username: string;

  @MinLength(8)
  @Matches(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,}$"
    ),
    {
      message:
        "Password non sicura, deve contenere almeno un lettera maiuscola, una minuscola, un numero e un carattere speciale",
    }
  )
  password: string;
}

export class ChangePasswordDTO {}
