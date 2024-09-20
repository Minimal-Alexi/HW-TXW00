const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); ///OH MY GOD THIS KILLED MY DATABASE. WHY DID WE NOT CHANGE THE ENDPOINT FROM WEB-DEV TO PROJECT?! 😭😭😭
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
