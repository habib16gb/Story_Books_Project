import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgCyan.bold);
  } catch (error) {
    console.error(`MongoDb Not Connected: ${error.message}`.bgRed.bold);
    process.exit(1);
  }
};

export default connectDB;
