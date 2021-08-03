import { IsNotEmpty, ValidateNested, IsObject, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { INVALID_USER_NAME, INVALID_WORKING_HOURS } from "../exceptions";
import { UserName } from "./user-name";
import { WorkingHours } from "./working-hours";

export class CreateUserWoringTimeSlots {

  @ValidateNested()
  @IsObject({
    message: INVALID_WORKING_HOURS
  })
  workingHours!: WorkingHours;

  @IsNotEmpty()
  @IsNumber()
  timeSlotDuration!: number;

  @Type(() => UserName)
  @ValidateNested()
  @IsObject({
    message: INVALID_USER_NAME
  })
  name!: UserName;
}
