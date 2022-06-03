const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({
      filename: "script.log",
      level: "info",
    }),
  ],
});

module.exports = logger;
