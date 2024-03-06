// File: scripts/createPMUser.js

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User"); // Update this path to where your User model is located
const bcrypt = require("bcryptjs");

const createPMUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Hash the password
    const passwordHash = await bcrypt.hash("password123", 8);

    // Create the PM user
    const pmUser = new User({
      username: "pmUser",
      email: "pm@example.com",
      password: passwordHash,
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
