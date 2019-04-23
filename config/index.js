require("dotenv").config();
const bunyan = require("bunyan");
const serviceAccessToken = require("crypto").randomBytes(16).toString("hex").slice(0, 32);

const log = {
  development: () => {
    return bunyan.createLogger({ name: "development", level: "debug" });
  },
  production: () => {
    return bunyan.createLogger({ name: "production", level: "info" });
  },
  test: () => {
    return bunyan.createLogger({ name: "test", level: "fatal" });
  }
};

module.exports = {
  locationiqApiKey: process.env.LOCATIONIQ_API_KEY,
  timezonedbApiKey: process.env.TIMEZONEDB_API_KEY,
  appApiToken: process.env.APP_API_TOKEN,
  serviceAccessToken,
  log: env => {
    if (env) return log[env]();
    return log[process.env.NODE_ENV || "development"]();
  }
};