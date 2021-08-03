import mongoose from "mongoose";

export default async (connectionUrl: string) => {
  await mongoose
    .connect(connectionUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      console.log("MongoDB connection error. Please make sure MongoDB is running and mongodb env configuration valid. " + err);
    });
};
