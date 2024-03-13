// File: scripts/createPMUser.js

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const createPMUser = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/easylang", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create the PM user
    const pmUser = new User({
      username: "pmUser",
      email: "pm@example.com",
      password: "Password123",
      role: "projectManager",
    });

    //update the user
    await pmUser.save();
    console.log("PM user created successfully!");
  } catch (error) {
    console.error("Failed to create PM user:", error);
  } finally {
    mongoose.connection.close();
  }
};

createPMUser();
