import { Request } from "express";
import moment from "moment";
import { filter, find, map, reduce } from "lodash";
import { getWorkingday, SlotStatus, updateUserBookedSlotsData, updateUserData } from "../utils";
import { getUserDataModel, TimeSlot, UserDataProps } from "../models";


export const processCreateWoringTimeSlots = async (request: Request): Promise<void> => {
  try {
    const userDataModel = getUserDataModel();
    const { name: { firstName, lastName }, workingHours: { start, end }, timeSlotDuration } = request?.body;
    const day = moment(start).format("DD/MM/YYYY");

    const existingUser = await userDataModel.findOne({ firstName, lastName });

    if (existingUser) {
      updateUserData({ user: existingUser, day, start, end, timeSlotDuration });
    } else {
      const workingDay = getWorkingday(day, start, end, timeSlotDuration);
      await userDataModel.create({ firstName, lastName, workingDays: [ workingDay ] })
    }
  } catch (e) {
    console.error(`functionName: processCreateWoringTimeSlots - errorMessage: '${e.message}'`);
    throw e;
  }
};

export const processSearchUser = async (request: Request): Promise<UserDataProps | UserDataProps[]> => {
  try {
    const userDataModel = getUserDataModel();
    const { firstName, lastName } = request?.body;
    if (!lastName) {
      return userDataModel.find({ firstName });
    }
    const user = await userDataModel.findOne({ firstName, lastName });
    return user || [];

  } catch (e) {
    console.error(`functionName: processSearchUser - errorMessage: '${e.message}'`);
    throw e;
  }
};

export const processviewAvailableSlots = async (request: Request): Promise<TimeSlot[]> => {
  try {
    const userDataModel = getUserDataModel();
    const { userId, day } = request?.body;
    const { workingDays } = await userDataModel.findById(userId);
    const foundWorkingDay = find(workingDays, workingDay => workingDay.day === day);

    if(foundWorkingDay) {
      return filter(foundWorkingDay.timeSlots, timeSlot => timeSlot.status === SlotStatus.available)
    }
    return [];

  } catch (e) {
    console.error(`functionName: processviewAvailableSlots - errorMessage: '${e.message}'`);
    throw e;
  }
};

export const processBookSlots = async (request: Request): Promise<void> => {
  try {
    const userDataModel = getUserDataModel();
    const { userId, ownerId, day, timeSlot } = request?.body;

    const { workingDays } = await userDataModel.findById(ownerId);
    const foundWorkingDay = find(workingDays, workingDay => workingDay.day === day);

    const { newTimeSlots, isSlotBooked } = reduce(foundWorkingDay.timeSlots, (acc, slot) => {
      if (slot.value === timeSlot) {
        const isBooked = slot.status === SlotStatus.booked;
        slot.status = isBooked ? slot.status : SlotStatus.booked;
        acc.newTimeSlots.push(slot);
        return { ...acc, isSlotBooked: isBooked };
      }
      acc.newTimeSlots.push(slot);
      return acc;
    }, { newTimeSlots: [], isSlotBooked: false });

    if (isSlotBooked) throw new Error("Slot already booked"); // tODO
      await userDataModel.updateOne({ _id: ownerId, "workingDays.day": day }, { $set: { "workingDays.$.timeSlots": newTimeSlots }});
      await updateUserBookedSlotsData(ownerId, userId, day, timeSlot); // fix naming

  } catch (e) {
    console.error(`functionName: processBookSlots - errorMessage: '${e.message}'`);
    throw e;
  }
};

export const processViewBookedSlots = async (request: Request): Promise<any> => {
  try {
    const userDataModel = getUserDataModel();
    const { userId, day } = request?.body;
    const { bookedSlots } = await userDataModel.findById(userId);
    return filter(bookedSlots, bookedSlot => bookedSlot.day === day);

  } catch (e) {
    console.error(`functionName: processViewBookedSlots - errorMessage: '${e.message}'`);
    throw e;
  }
};


