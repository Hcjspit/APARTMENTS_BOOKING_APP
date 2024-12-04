import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateIf,
} from "class-validator";

export class RegisterUserDTO {
  @IsEmail()
  username: string;

  @MinLength(8)
  //   @Matches(
  //     new RegExp(
  //       "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,}$"
  //     ),
  //     {
  //       message:
  //         "Password non sicura, deve contenere almeno un lettera maiuscola, una minuscola, un numero e un carattere speciale",
  //     }
  //   )
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  residence: string;

  @IsOptional()
  profileImage: string;

  @ValidateIf((o) => o.password !== undefined)
  @IsString()
  confirmPassword: string;

  validatePasswordMatch() {
    if (this.password !== this.confirmPassword) {
      throw new Error("Password and confirm password do not match.");
    }
  }
}
