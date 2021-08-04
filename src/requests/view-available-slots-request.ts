import { IsNotEmpty, IsString } from "class-validator";
export class ViewAvailableSlotsRequest {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  day!: Date;
}
