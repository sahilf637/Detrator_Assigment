import mysql from "mysql2";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
};

const databaseName = "AssignmentDB";
const tableName = "comments";

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    return;
  }
  console.log("Connected to MySQL server");

  connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log(`Database "${databaseName}" created or already exists`);

    connection.changeUser({ database: databaseName }, (err) => {
      if (err) {
        console.error("Error switching database:", err);
        return;
      }

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          comment TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log(`Table "${tableName}" created or already exists`);
        }
        connection.end();
      });
    });
  });
});
