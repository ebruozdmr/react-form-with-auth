const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI ||
        "mongodb+srv://ozdemirebbru:AARqcl5U20mqM7xL@backenddb.vl4mjvu.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
    );
    console.log("Connected to database!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
