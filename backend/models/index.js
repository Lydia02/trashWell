const { Sequelize } = require('sequelize');
const WasteCollection = require('./wasteCollection');
const RecyclingEntry = require('./RecyclingEntry');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const modelDefiners = [
    require('./user'), // Import the user model definition
    require('./wasteCollection'),
    require('./RecyclingEntry'),
];

// Define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, Sequelize.DataTypes);
}

// Apply associations if there are any
// (e.g., if you have relationships like User.hasMany(Posts) you will define them here)
sequelize.sync(); // You can also handle syncing in a more controlled manner in your app startup

const db = {
    sequelize,
    Sequelize,
    User: sequelize.models.User, 
    WasteCollection: sequelize.models.WasteCollection,
    RecyclingEntry: sequelize.models.RecyclingEntry,
};

module.exports = db;
