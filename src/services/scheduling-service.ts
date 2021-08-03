import { Request } from "express";
import moment from "moment";
import { getWorkingday, updateUserData } from "../utils";
import { getUserDataModel, SlotStatus, TimeSlot, userData, WorkingDaySchema } from "../models";
import { filter, find } from "lodash";

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

export const processSearchUser = async (request: Request): Promise<any> => { // TODO fix type
  try {
    // const userDataModel = getUserDataModel();
    //

  } catch (e) {
    console.error(`functionName: processSearchUser - errorMessage: '${e.message}'`);
    throw e;
  }
};

export const processviewAvailableSlots = async (request: Request): Promise<TimeSlot[]> => {
  try {
    const userDataModel = getUserDataModel();
    const { userId, day } = request?.body;
    const { workingDays } = await userDataModel.findById(userId); // TODO find with db functions
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

export const processbookSlots = async (request: Request): Promise<any> => { // TODO fix type
  try {
    // const userDataModel = getUserDataModel();


  } catch (e) {
    console.error(`functionName: processbookSlots - errorMessage: '${e.message}'`);
    throw e;
  }
};

export const processViewBookedSlots = async (request: Request): Promise<any> => { // TODO fix type
  try {
    // const userDataModel = getUserDataModel();


  } catch (e) {
    console.error(`functionName: processViewBookedSlots - errorMessage: '${e.message}'`);
    throw e;
  }
};


