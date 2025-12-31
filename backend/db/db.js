import mongoose from "mongoose";

import insertDefaultAvatars from "../utils/defaultAvatars.js";

const connectDB = async () => {
  try {
    // Keep the SRV URI intact and pass dbName separately to avoid malformed schemes
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB connected !! DB Host :", connectionInstance.connection.host);

    await insertDefaultAvatars();
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;