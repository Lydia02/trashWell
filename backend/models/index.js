const Sequelize = require('sequelize');
const config = require('../config/config'); // Adjust the path if necessary
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelizeOptions = {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: process.env.DB_PORT || 5432,
};

// Conditionally add SSL configuration
if (process.env.DB_USE_SSL === 'true') {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, sequelizeOptions);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.WasteCollection = require('./wasteCollection')(sequelize, Sequelize);
db.RecyclingEntry = require('./RecyclingEntry')(sequelize, Sequelize);

module.exports = db;
