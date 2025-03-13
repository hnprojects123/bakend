const express = require("express");
const db = require("../config/db"); // Import MySQL connection
const authenticate = require("../middleware/authMiddleware"); // Import authentication middleware
const { createAppointment, getUserAppointments } = require("../models/appointmentModel");


const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new appointment
 * @access  Private (User must be logged in)
 */
// Booking an Appointment
router.post("/", authenticate, (req, res) => {
  const { name, phone, email, service, date, time, notes } = req.body;
  if (!name || !phone || !email || !service || !date || !time) {
    return res.status(400).json({ message: "All fields except notes are required!" });
  }

  createAppointment(req.user.id, name, phone, email, service, date, time, notes, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "Appointment booked successfully!" });
  });
});

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings for logged-in user
 * @access  Private
 */
router.get("/", authenticate, (req, res) => {
  getUserAppointments(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
});

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete a booking
 * @access  Private
 */
router.delete("/:id", authenticate, (req, res) => {
  const userId = req.user.id;
  const bookingId = req.params.id;

  const sql = "DELETE FROM appointments WHERE id = ? AND user_id = ?";
  
  db.query(sql, [bookingId, userId], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).json({ message: "Database error", error: err.sqlMessage });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found or unauthorized" });
    }
    res.json({ message: "Booking deleted successfully" });
  });
});

module.exports = router;
