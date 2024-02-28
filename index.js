const express = require("express");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
// Import routes for Manager and ProjectManager similarly
const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
// Use routes for Manager and ProjectManager similarly

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
