import { IsNotEmpty, IsOptional } from "class-validator";

export class SearchUserRequest {
  @IsNotEmpty()
  firstName!: string;

  @IsOptional()
  lastName: string;
}