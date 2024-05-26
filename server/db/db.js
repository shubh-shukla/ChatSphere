import mongoose from "mongoose";

import insertDefaultAvatars from "../utils/defaultAvatars.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("MongoDB connected !! DB Host :", connectionInstance.connection.host);

    await insertDefaultAvatars();
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;