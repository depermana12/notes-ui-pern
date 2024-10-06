import app from "./app";

process.on("uncaughtException", (err: Error) => {
  // TODO: log error to winston
  console.error("Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  // TODO: log error to winston
  console.error("Unhandled Rejection: ", err);
  process.exit(1);
});

const server = app.listen(process.env.PORT || 3000);
console.log(`Server good to go`);
