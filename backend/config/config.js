if (!process.env.DB_HOST) {
  require('dotenv').config({path: './.env'});
}

const fs = require('fs');

let config = {  
  database: "RasBet",
  username: "postgres",
  password: "fenoninho123",
  host: "127.0.0.1",
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? {
      require: true,
      ca: fs.readFileSync(process.env.DB_SSL_CA)
    } : false
  },
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 300000,
    acquire: 300000
  },
  define: {
    timestamps: true,
    underscored: true
  }
}

module.exports = {
  development: config,
  test: config,
  production: config
}