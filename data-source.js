const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'iszysax',
  password: 'Adebayo0909!',
  database: 'ecommerce'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

const createTablesSQL = `
CREATE TABLE IF NOT EXISTS User (
  id CHAR(36) PRIMARY KEY,  -- UUID column for the unique identifier
  name VARCHAR(100) DEFAULT 'Unknown',  -- Column for the user's name with a default value
  email VARCHAR(255) UNIQUE NOT NULL,  -- Column for the user's email, with a unique constraint
  password VARCHAR(255) NOT NULL,  -- Column for the hashed password
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Optional: Column for the creation timestamp
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Optional: Column for the last update timestamp
);
`;

// Execute the SQL queries
connection.query(createTablesSQL, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }

  // Close the connection
  connection.end();
});
