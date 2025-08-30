import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}