import { find, isEmpty, some } from "lodash";
import moment from "moment";
import { getUserDataModel, TimeSlot, UserDataProps, WorkingDay } from "../models";
import { SlotStatus } from "./types";

export const getWorkingday = (day: string, start: string, end: string, timeSlotDuration: number): WorkingDay => {
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

export const updateUserData = (userData: { user: UserDataProps, day: string, start: string, end: string, timeSlotDuration: number }): void => {
  const { user: { workingDays, _id: userId }, day, start, end, timeSlotDuration } = userData;
  const existingWorkingDay = find(workingDays, workingDay => workingDay.day === day);
  if (!existingWorkingDay) {
    createAndUpdateWorkingDay(userId, day, start, end, timeSlotDuration);
  } else {
    const isExistingBookedSlot = checkExistingBookedSlot(existingWorkingDay.timeSlots);
    if (!isExistingBookedSlot)
      updateExistingWorkingDay(userId, day, start, end, timeSlotDuration);
  }
}

export const updateExistingWorkingDay = async (userId: string, day: string, start: string, end: string, timeSlotDuration: number) => {
  const userDataModel = getUserDataModel();
  const newWorkingDay = getWorkingday(day, start, end, timeSlotDuration);
  await userDataModel.findOneAndUpdate({ _id: userId, "workingDays.day": day }, { $set: { "workingDays.$.timeSlots": newWorkingDay.timeSlots } } );
}

export const createAndUpdateWorkingDay = async (userId: string, day: string, start: string, end: string, timeSlotDuration: number): Promise<void> => {
  const userDataModel = getUserDataModel();
  const newWorkingDay = getWorkingday(day, start, end, timeSlotDuration);
  await userDataModel.findByIdAndUpdate(userId, { $push: { workingDays: newWorkingDay } });
}

export const checkExistingBookedSlot = (timeSlots: TimeSlot[]): boolean => {
  return some(timeSlots, ({ status }) => status === SlotStatus.booked);
}

export const updateUserBookedSlotsData = async (ownerId: string, userId: string, day: string, timeSlot: string) => {
  const userDataModel = getUserDataModel();
  const { bookedSlots } = await userDataModel.findById(userId);

  const newTimeSlotData = {
    day,
    slots: [{ userId: ownerId, slot: timeSlot }]
  }

  const existingBookedDay = find(bookedSlots, bookedSlot => bookedSlot.day === day);

  if (isEmpty(bookedSlots) || !existingBookedDay) {
    await userDataModel.findByIdAndUpdate(userId, { $push: { bookedSlots: newTimeSlotData }});
  }
  else {
    await userDataModel.findOneAndUpdate({ _id: userId, "bookedSlots.day": day }, { $push: { "bookedSlots.$.slots": { userId: ownerId, timeSlot } }});
  }
}