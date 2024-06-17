require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Load the JSON configuration file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Replace placeholders with environment variables
Object.keys(config.production).forEach((key) => {
  if (config.production[key].startsWith('DB_')) {
    config.production[key] = process.env[config.production[key]];
  }
});

module.exports = config;
