const mysql = require("mysql");

const dbConfig = {
  host: process.env.MYSQL_HOST, // GoDaddy MySQL hostname
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306, // MySQL default port
  connectTimeout: 20000, // 20 sec timeout (increase to avoid ETIMEDOUT)
  acquireTimeout: 20000, // Extra timeout handling
  multipleStatements: true, // Allow multiple queries
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      setTimeout(handleDisconnect, 5000); // Retry in 5 sec if connection fails
    } else {
      console.log("✅ Connected to MySQL database!");
    }
  });

  connection.on("error", (err) => {
    console.error("MySQL error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.fatal) {
      console.log("🔄 Reconnecting...");
      handleDisconnect(); // Auto-reconnect
    }
  });
}

handleDisconnect();

module.exports = connection;
