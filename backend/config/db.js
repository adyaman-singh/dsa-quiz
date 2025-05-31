import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const DB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10,
};

const handleConnectionEvents = () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
};

const handleShutdown = (signal) => {
  mongoose.connection.close(() => {
    console.log(`MongoDB disconnected through ${signal}`);
    process.exit(0);
  });
};

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MongoDB connection URI is not defined");
    }

    handleConnectionEvents();

    await mongoose.connect(process.env.MONGO_URI, DB_CONFIG);

    process.on("SIGINT", () => handleShutdown("SIGINT"));
    process.on("SIGTERM", () => handleShutdown("SIGTERM"));

    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);

    if (error.name === "MongoNetworkError") {
      console.error("Network error - check your connection to MongoDB");
    } else if (error.name === "MongooseServerSelectionError") {
      console.error("Server selection error - check if MongoDB is running");
    } else if (error.name === "MongoParseError") {
      console.error("URI parsing error - check your MONGO_URI format");
    }

    process.exit(1);
  }
};
