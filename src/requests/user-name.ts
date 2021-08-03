import { IsNotEmpty } from "class-validator";
export class UserName {
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;
}