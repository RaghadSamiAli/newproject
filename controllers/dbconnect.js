
// Database
const db = require('../config/db');
// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))