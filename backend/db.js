var mysql = require('mysql2');
var conn = mysql.createConnection({
    host: '34.16.119.202',
    user: 'root',
    password: 'CS411Team37',
    database: 'Los_Angeles_Crime_Data'
});

conn.connect(err => {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
  
    console.log('Connected as id ' + conn.threadId);
});

module.exports = conn;