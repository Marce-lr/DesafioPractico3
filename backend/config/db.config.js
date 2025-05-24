require("dotenv").config();
let dbConfig;

if (process.env.NODE_ENV == "production") {
  dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DD_USER,
    PASSWORD: procces.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
  };
} else {
  dbConfig = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DD_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_NAME || "librosdb",
    PORT: process.env.DB_PORT || 3006,
  };
}

module.exports = dbConfig;
