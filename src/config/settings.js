// Here provide all the values from .env and export them as a module
require('dotenv').config();
    // DataBase configuration
  let DB_NAME = process.env.DB_NAME;
  let DB_USERNAME= process.env.DB_USERNAME;
  let DB_PASSWORD= process.env.DB_PASSWORD;
  let DB_HOST= process.env.DB_HOST;
  let DB_PORT= process.env.DB_PORT;
  let DB_ENGINE= process.env.DB_ENGINE;
  let DATABASE_URL= `${DB_ENGINE}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    // JWT configuration
  let JWT_SECRET_KEY= process.env.JWT_SECRET_KEY;
  let ACCESS_TOKEN_EXPIRE_MINUTES= process.env.ACCESS_TOKEN_EXPIRE_MINUTES;
  let REFRESH_TOKEN_EXPIRE_DAYS= process.env.REFRESH_TOKEN_EXPIRE_DAYS;
  let ALGORITHM= 'HS256';

  // Finnhub API Key
  let FINNHUB_API_KEY= process.env.FINNHUB_API_KEY;
  let FMP_API_KEY= process.env.FMP_API_KEY
  
module.exports = {
  DATABASE_URL,
  JWT_SECRET_KEY,
  ACCESS_TOKEN_EXPIRE_MINUTES,
  REFRESH_TOKEN_EXPIRE_DAYS,
  ALGORITHM,
  FINNHUB_API_KEY,
  FMP_API_KEY
};