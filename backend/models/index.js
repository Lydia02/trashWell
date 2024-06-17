"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Import all models
const modelDefiners = [
  require("./user"),
  require("./wasteCollection"),
  require("./RecyclingEntry"),
];

// Define all models according to their files
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, Sequelize.DataTypes);
}

// Apply associations
const { User, WasteCollection, RecyclingEntry } = sequelize.models;

User.associate = (models) => {
  User.hasMany(models.WasteCollection, { foreignKey: "userId" });
  User.hasMany(models.RecyclingEntry, { foreignKey: "userId" });
};

WasteCollection.associate = (models) => {
  WasteCollection.belongsTo(models.User, { foreignKey: "userId" });
};

RecyclingEntry.associate = (models) => {
  RecyclingEntry.belongsTo(models.User, { foreignKey: "userId" });
};

// Call the associate methods
User.associate({ WasteCollection, RecyclingEntry });
WasteCollection.associate({ User });
RecyclingEntry.associate({ User });

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.WasteCollection = WasteCollection;
db.RecyclingEntry = RecyclingEntry;

module.exports = db;
