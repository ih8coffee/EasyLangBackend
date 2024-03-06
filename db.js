// File: db.js

const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/easylang";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));
