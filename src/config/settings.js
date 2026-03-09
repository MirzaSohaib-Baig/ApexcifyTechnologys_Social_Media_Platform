// Here provide all the values from .env and export them as a module
require('dotenv').config();
    // DataBase configuration
  let MONGOOSE_URI= process.env.MONGOOSE_URI;

    // JWT configuration
  let JWT_SECRET_KEY= process.env.JWT_SECRET_KEY;
  let ACCESS_TOKEN_EXPIRE_MINUTES= process.env.ACCESS_TOKEN_EXPIRE_MINUTES;
  let REFRESH_TOKEN_EXPIRE_DAYS= process.env.REFRESH_TOKEN_EXPIRE_DAYS;
  let ALGORITHM= 'HS256';
  
module.exports = {
  MONGOOSE_URI,
  JWT_SECRET_KEY,
  ACCESS_TOKEN_EXPIRE_MINUTES,
  REFRESH_TOKEN_EXPIRE_DAYS,
  ALGORITHM,
};