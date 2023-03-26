const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbString = process.env.NODE_ENV === "production" ? process.env.AUTH_DB : process.env.DB_LOCAL;

const ConnectDB = async () => {
  try {
    await mongoose.connect(mongoDbString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to ${mongoDbString}...`);
  } catch (error) {
    console.error(`Failed to connect to ${mongoDbString}: ${error}`);
  }
};

module.exports = ConnectDB;
