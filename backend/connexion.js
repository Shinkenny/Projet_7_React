const mysql = require('mysql');
require('dotenv').config();

/* Connection to MySql Database */
const connexion = mysql.createConnection({
   host: process.env.REACT_APP_DB_HOST,
   user: process.env.REACT_APP_DB_USER,
   password: process.env.REACT_APP_DB_PASS,
   database: process.env.REACT_APP_DB_BASE
});

connexion.connect(function(err) {
   if(err){
    console.log('Erreur de connection');
    return;
  }
  console.log('Connection établie');
});

module.exports = connexion;