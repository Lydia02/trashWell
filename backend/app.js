require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const scheduleRoutes = require("./routes/schedules");
const recyclingRoutes = require("./routes/recycling");
const adminAuth = require("./routes/adminAuth");
const adminRoutes = require("./routes/admin");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));
app.use("/api/auth", authRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/recycling", recyclingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/adminauth", adminAuth);

app.get("/", (req, res) => {
  res.send("Smart Waste Management System is up and running!");
});