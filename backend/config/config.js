module.exports = {
  development: {
    username: process.env.DB_USER || 'wmsy',
    password: process.env.DB_PASS || 'group15',
    database: process.env.DB_NAME || 'wmsy',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER || 'wmsy',
    password: process.env.DB_PASS || 'group15',
    database: process.env.DB_NAME || 'wmsy',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
