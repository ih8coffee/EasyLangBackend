// File: scripts/createPMUser.js

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/easylang", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create the Admin user
    const Admin = new User({
      username: "Admin",
      name: "Admin",
      surname: "Admin",
      email: "admin@example.com",
      password: "Password123",
      role: "admin",
    });

    //update the user
    await Admin.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Failed to create Admin user:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
