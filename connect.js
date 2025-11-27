const mongoose = require("mongoose");

async function connectToDatabase(url) {
  if (!url) {
    throw new Error("MONGO_URI not found in environment variables");
  }

  return mongoose.connect(url);
}

module.exports = { connectToDatabase };