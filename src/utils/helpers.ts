import { find, some } from "lodash";
import moment from "moment";
import { getUserDataModel, SlotStatus, TimeSlot, WorkingDay } from "../models";

// TODO use resduce or smt else
export const getWorkingday = (day: string, start: string, end: string, timeSlotDuration: number): WorkingDay => {
  const userDataModel = getUserDataModel();
  const startInMinutes = moment.duration(moment(start).format("HH:mm")).asMinutes();
  const endInMinutes = moment.duration(moment(end).format("HH:mm")).asMinutes();
  const duration = endInMinutes - startInMinutes;

  const count = Math.floor(duration / timeSlotDuration);
  const timeSlots = [];
  let current = startInMinutes;

  for(let i = 0; i < count; i++) {
    const value = moment.utc(moment.duration(current, "minutes").asMilliseconds()).format("HH:mm");
    const status = SlotStatus.available;
    timeSlots.push({ value, status })
    current += timeSlotDuration;
  }
  return {
    day,
    timeSlots
  }
}

export const updateUserData = (userData: { user: any, day: string, start: string, end: string, timeSlotDuration: number }): void => {
  const { user: { workingDays, _id: userId }, day, start, end, timeSlotDuration } = userData;
  const existingWorkingDay = find(workingDays, workingDay => workingDay.day === day);
  if (!existingWorkingDay) {
    createAndUpdateWorkingDay(userId, day, start, end, timeSlotDuration);
  } else {
    const isExistingBookedSlot = checkExistingBookedSlot(existingWorkingDay.timeSlots);
    if (isExistingBookedSlot) throw new Error("You can't change your working hours, there is an already booked slot"); // move message TODO or just do nothing
  }
}

export const createAndUpdateWorkingDay = async (userId: string, day: string, start: string, end: string, timeSlotDuration: number): Promise<void> => {
  const userDataModel = getUserDataModel();
  const newWorkingDay = getWorkingday(day, start, end, timeSlotDuration);
  await userDataModel.findByIdAndUpdate(userId, { $push: { workingDays: newWorkingDay } });
}

export const checkExistingBookedSlot = (timeSlots: TimeSlot[]): boolean => {
  return some(timeSlots, ({ status }) => status === SlotStatus.booked);
}