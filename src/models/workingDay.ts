import { SlotStatus } from "../utils";

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