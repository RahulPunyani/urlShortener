import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URI;
  console.log("MONGOOOO" + MONGO_URL);
  try {
    await mongoose.connect(MONGO_URL ?? "");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;
