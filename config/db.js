const mysql = require("mysql");

// const dbConfig = {
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// };
const dbConfig = {
  host: process.env.MYSQL_HOST,      // Use GoDaddy MySQL host
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,  // MySQL default port
  connectTimeout: 10000, // 10 sec timeout
};
let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      setTimeout(handleDisconnect, 5000); // Retry after 5 seconds
    } else {
      console.log("Connected to MySQL database!");
    }
  });

  connection.on("error", (err) => {
    console.error("MySQL error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.fatal) {
      console.log("Reconnecting...");
      handleDisconnect(); // Reconnect on lost connection
    }
  });
}

handleDisconnect();

module.exports = connection;
