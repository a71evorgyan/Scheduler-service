import { Request, Response, NextFunction } from "express";
import {
  processBookSlots,
  processCreateWoringTimeSlots, processSearchUser, processviewAvailableSlots, processViewBookedSlots,
} from "../services";

export const createWoringTimeSlots = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const result = await processCreateWoringTimeSlots(req);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const searchUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const result = await processSearchUser(req);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const viewAvailableSlots = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const result = await processviewAvailableSlots(req);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const bookSlots = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const result = await processBookSlots(req);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const viewBookedSlots = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const result = await processViewBookedSlots(req);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

