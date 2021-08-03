import Container from "typedi";
import { Model } from "mongoose";
import { UserDataProps } from "./userData";

export * from "./userData";
export * from "./bookedSlot";
export * from "./workingDay";

export const getUserDataModel = (): Model<UserDataProps> => {
  return Container.get("model.userData");
};
