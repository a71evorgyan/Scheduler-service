import { IsNotEmpty, IsString } from "class-validator";
export class ViewBookedSlotsRequest {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  day!: Date;
}
