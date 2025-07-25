const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, //  Ensures encrypted connection
      retryWrites: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
