require("dotenv").config();
const bunyan = require("bunyan");

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
  log: env => {
    if (env) return log[env]();
    return log[process.env.NODE_ENV || "development"]();
  }
};