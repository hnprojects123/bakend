const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  connectTimeout: 1000000 // 10 seconds timeout
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err);
  } else {
    console.log("✅ Successfully connected to MySQL!");
  }
});

// Handle MySQL disconnection
db.on("error", (err) => {
  console.error("❌ MySQL Connection Error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
    console.log("🔄 Reconnecting to MySQL...");
    db.connect();
  } else {
    throw err;
  }
});

module.exports = db;
