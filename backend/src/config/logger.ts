import winston from "winston";
import path from "node:path";
import { info } from "node:console";

const BASE_PATH = path.resolve(__dirname, "../");

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta",
  },
};

winston.addColors(config.colors);

const logger = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      const errorMessage = stack ? `${stack}` : message;
      return `${level}:\n${timestamp}\n${errorMessage}\n`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, stack }) => {
          const errorMessage = stack ? `${stack}` : message;
          return `${level} \n${errorMessage}\n`;
        }),
      ),
    }),
    new winston.transports.File({
      filename: path.join(BASE_PATH, "logs", "combine.log"),
      format: winston.format.combine(
        winston.format((info) => {
          if (info.level === "error") {
            return false;
          }
          return info;
        })(),
      ),
    }),
    new winston.transports.File({
      filename: path.join(BASE_PATH, "logs", "error.log"),
      level: "error",
    }),
  ],
});

export default logger;
