import { IsNotEmpty } from "class-validator";

export class WorkingHours {
  @IsNotEmpty()
  start!: string;

  @IsNotEmpty()
  end!: string;
}