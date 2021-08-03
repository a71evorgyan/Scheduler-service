import express from "express";
import { validationBodyMiddleware } from "../../middlewares";
import { bookSlots, createWoringTimeSlots, searchUser, viewAvailableSlots, viewBookedSlots } from "../../controllers";
import { BookSlotsRequest, CreateUserWoringTimeSlots, SearchUserRequest, ViewAvailableSlotsRequest, ViewBookedSlotsRequest } from "../../requests";

const router = express.Router();

router.post("/createUserWoringTimeSlots", validationBodyMiddleware(CreateUserWoringTimeSlots), createWoringTimeSlots);
router.post("/searchUser", validationBodyMiddleware(SearchUserRequest), searchUser);
router.get("/viewAvailableSlots", validationBodyMiddleware(ViewAvailableSlotsRequest), viewAvailableSlots);
router.get("/bookSlots", validationBodyMiddleware(BookSlotsRequest), bookSlots);
router.get("/viewBookedSlots", validationBodyMiddleware(ViewBookedSlotsRequest), viewBookedSlots)

export default router;
