const db = require("../config/db");

const createAppointment = (userId, name, phone, email, service, date, time, notes, callback) => {
  const sql = "INSERT INTO appointments (user_id, name, phone, email, service, date, time, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [userId, name, phone, email, service, date, time, notes], callback);
};

const getUserAppointments = (userId, callback) => {
  const sql = "SELECT * FROM appointments WHERE user_id = ?";
  db.query(sql, [userId], callback);
};

module.exports = { createAppointment, getUserAppointments };
