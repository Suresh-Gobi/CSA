const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables

// Create a Sequelize instance with the necessary connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database username
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST,  // Host, e.g., localhost
    dialect: 'mysql',           // Use MySQL dialect
    port: process.env.DB_PORT || 3306,  // MySQL port, default to 3306 if not provided
    logging: console.log,  // Enable logging of SQL queries to the console
  }
);

// Create the db object to hold Sequelize instance and models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./userModel')(sequelize, Sequelize);
db.Ticket = require('./ticket.model')(sequelize, Sequelize);

// Export the db object with Sequelize and models
module.exports = db;
