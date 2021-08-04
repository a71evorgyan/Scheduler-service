import { IsNotEmpty, IsString } from "class-validator";
export class BookSlotsRequest {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  ownerId!: string;

  @IsNotEmpty()
  day!: string;

  @IsNotEmpty()
  @IsString()
  timeSlot!: string;
}