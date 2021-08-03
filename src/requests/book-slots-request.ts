import { IsNotEmpty, IsString } from "class-validator";

export class BookSlotsRequest {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  timeSlotDuration!: string;
}