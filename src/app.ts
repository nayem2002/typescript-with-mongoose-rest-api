import express, { Application } from "express";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "./router/user.router";
import connectDatabase from "./config/db.config";

config();
config({ path: `${__dirname}/../config.env` });
connectDatabase();
const app: Application = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// router
app.use("/api/v1", userRouter);

const port: number = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(port, () => {
  console.log(`🚀 server runing is port http://localhost:${port}`);
});
