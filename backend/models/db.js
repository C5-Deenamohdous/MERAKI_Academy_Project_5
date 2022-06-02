/* This is creating a connection to the database. */
const mysql = require("mysql2");

/* This is creating a connection to the database. */
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

/* This is creating a connection to the database. */
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

/* This is exporting the connection to the database. */
module.exports = connection;
