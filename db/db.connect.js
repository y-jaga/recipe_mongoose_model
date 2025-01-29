require("dotenv").config();
const mongoose = require("mongoose");
const mongoDbUri = process.env.MONGODB;

const initizlizeDatabase = async () => {
  await mongoose
    .connect(mongoDbUri)
    .then(() => console.log("Database successfully connected."))
    .catch((error) =>
      console.error("Failed to connect to database", error.message)
    );
};
initizlizeDatabase();
