require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const User = require("../models/User");

const createPM = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/easylang");

    // Create users
    const users = {
      username: "user4",
      name: "Bob",
      surname: "Johnson",
      email: "bob.johnson@example.com",
      phone: "1234567894",
      password: bycrypt.hashSync("password123", 8),
      role: "projectManager",
    };

    // Save users
    await User.create(users);
    console.log("Project Manager created successfully");
  } catch (error) {
    console.error("Error creating Project Manager:", error);
  } finally {
    mongoose.disconnect();
  }
};

createPM();
