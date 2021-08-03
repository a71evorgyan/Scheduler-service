export type Slot = {
  userId: string;
  slot: string;
}

export const SlotSchema = {
  _id: false,
  userId: { type: String },
  slot: { type: String }
}

export type BookedSlot = {
  day: string;
  slots: Slot[];
}

export const BookedSlotSchema = {
  _id: false,
  day: { type: String },
  slots: { type: [SlotSchema] }
};