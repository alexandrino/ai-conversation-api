const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  silent: process.env.NODE_ENV === "test",
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console({})],
});

module.exports = { logger };
