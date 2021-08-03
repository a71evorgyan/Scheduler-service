import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
export const MONGODB_URI = `${MONGODB_URL}/${MONGODB_DATABASE}`;
