 const mongoose = require("mongoose"); // way of writing import mongoose from mongoose

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});  // connects to mongodb database
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
