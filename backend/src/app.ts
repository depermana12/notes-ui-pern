import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user";
import noteRoute from "./routes/note";
import authRoute from "./routes/auth";
import globalErrorHandler from "./middlewares/errorHandler";
import authorization from "./middlewares/authzHandler";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", authorization, userRoute);
app.use("/api/v1/notes", authorization, noteRoute);

app.use(globalErrorHandler);

export default app;
