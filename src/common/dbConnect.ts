import mongoose from "mongoose";
import config from "./config";

export default async () => {
  const url = config.db.url;
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log(err);
  }
};
