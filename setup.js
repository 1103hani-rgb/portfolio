require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'yamabiko.proxy.rlwy.net',
  user: 'root',
  password: 'wEmTUMHkKIWdnmBXmfVLIcZSTYsJTGmT',
  database: 'railway',
  port: 37350
});
connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    return;
  }
  console.log('Connected to Railway MySQL!');
  const createProjects = `
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      tech VARCHAR(255),
      github_url VARCHAR(500),
      live_url VARCHAR(500),
      category VARCHAR(100),
      featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  const createContacts = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  connection.query(createProjects, (err) => {
    if (err) {
      console.error('Error creating projects table:', err.message);
    } else {
      console.log('Projects table created!');
    }
    connection.query(createContacts, (err) => {
      if (err) {
        console.error('Error creating contacts table:', err.message);
      } else {
        console.log('Contacts table created!');
      }
      connection.end();
    });
  });
});