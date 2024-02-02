const Sequelize = require('sequelize');
const config = require('./config'); // Make sure the path is correct

const sequelize = new Sequelize(
    'userlogin',  // Database name
    'root',       // Database username
    'qwerty',     // Database password
    {
        host: 'localhost', // Database host
        dialect: 'mysql'
    }
);

module.exports = sequelize;
