import express, { urlencoded, json} from "express";
import cors from "cors";
import connectMongo from "./database/connect";
import { MONGODB_URI } from "./utils/secrets";
import Router from "./routes";
import { Container } from "typedi";
import { userData } from "./models";


// Create Express server
const app = express();

// Connect to MongoDB
connectMongo(MONGODB_URI);

// Set userData model container
Container.set("model.userData", userData);

// Express configuration
app.set("port", process.env.PORT || 3500);
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

// Register router
Router.configure(app);

export default app;
