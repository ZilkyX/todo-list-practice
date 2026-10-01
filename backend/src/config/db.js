import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected mongodb:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting database", error);
    process.exit(1); //exit
  }
};
