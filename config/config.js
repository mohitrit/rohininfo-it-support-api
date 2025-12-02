require("dotenv").config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
    encrypt: false,
  },
};
const AllConfig = (dbName) => {
  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: dbName,
    port: 1433,
    options: {
      trustedConnection: true,
      enableArithAbort: true,
      trustServerCertificate: true,
      encrypt: false,
    },
  };
};

module.exports = {
  config,
  AllConfig,
};
