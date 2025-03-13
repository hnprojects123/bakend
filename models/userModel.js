const db = require("../config/db");

const createUser = (name, phone, email, password, callback) => {
  const sql = "INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, phone, email, password], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

module.exports = { createUser, getUserByEmail };
