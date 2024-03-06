// index.js

require("./db"); // Adjust the path if your db.js file is in a different directory

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
// Import routes for Manager and ProjectManager similarly

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", authRoutes);
// Use routes for Manager and ProjectManager similarly

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
