import { Schema, model, Document } from "mongoose";

export enum SlotStatus {
  available = "AVAILABLE",
  booked = "BOOKED",
};

export type TimeSlot = {
  value: string;
  status: SlotStatus
};

export const TimeSlotSchema = {
  _id: false,
  value: { type: String },
  status: { type: String, enum: Object.values(SlotStatus) }
};

export type WorkingDay = {
  day: string;
  timeSlots: TimeSlot[]
}

export const WorkingDaySchema = {
  _id: false,
  day: { type: String },
  timeSlots: [TimeSlotSchema]
};


export type UserInfo = {
  firstName: string;
  lastName: string;
}

export const UserInfoSchema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
}

export type BookedSlot = {
  userInfo: UserInfo;
  bookedSlots: { value: string }[]
}

export const BookedSlotSchema = {
  _id: false,
  userInfo: { type: UserInfoSchema },
  bookedSlots: [{ value: { type: String } }]
};

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
