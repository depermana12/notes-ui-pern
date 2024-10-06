import app from "./app";
import logger from "./config/logger";

process.on("uncaughtException", (err: Error) => {
  logger.error(`Uncaught Exception:\n${err.stack}`);
  logger.on("finish", () => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err: Error) => {
  logger.error(`Unhandled Rejection:\n${err.stack}`);
  logger.on("finish", () => {
    process.exit(1);
  });
});

const server = app.listen(process.env.PORT || 3000);
console.log(`Server good to go`);
