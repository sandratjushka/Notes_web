const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the Note model
const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: { // Add this field to associate notes with a user
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true, // This option adds createdAt and updatedAt fields
});

module.exports = Note;
