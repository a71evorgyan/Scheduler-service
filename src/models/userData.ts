import { Schema, model, Document } from "mongoose";
import { BookedSlot, BookedSlotSchema } from "./bookedSlot";
import { WorkingDay, WorkingDaySchema } from "./workingDay";
export interface UserDataProps extends Document {
  firstName: string;
  lastName: string;
  workingDays: WorkingDay[];
  bookedSlots: BookedSlot[]
}

const UserDataSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    workingDays: { type: [WorkingDaySchema] },
    bookedSlots: { type: [BookedSlotSchema] }
  },
  {
    timestamps: true,
    _id: true,
    versionKey: false,
  }
);

export const userData = model<UserDataProps>("userData", UserDataSchema);
