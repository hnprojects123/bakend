const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes); 

app.get("/", (req, res) => {
  res.send("Salon API is running!");
});

module.exports = app;  // Needed for Vercel

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
