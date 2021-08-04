import express from "express";
import { validationBodyMiddleware } from "../../middlewares";
import { bookSlots, createWoringTimeSlots, searchUser, viewAvailableSlots, viewBookedSlots } from "../../controllers";
import { BookSlotsRequest, CreateUserWoringTimeSlots, SearchUserRequest, ViewAvailableSlotsRequest, ViewBookedSlotsRequest } from "../../requests";

const router = express.Router();

router.get("user/search", validationBodyMiddleware(SearchUserRequest), searchUser);
router.get("/slots/available", validationBodyMiddleware(ViewAvailableSlotsRequest), viewAvailableSlots);
router.get("/slots/booked", validationBodyMiddleware(ViewBookedSlotsRequest), viewBookedSlots);

router.post("/createWoringTimeSlots", validationBodyMiddleware(CreateUserWoringTimeSlots), createWoringTimeSlots);
router.post("slots/book", validationBodyMiddleware(BookSlotsRequest), bookSlots);

export default router;
