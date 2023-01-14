import serverlessExpress from "@vendia/serverless-express";
import express from "express";
import hello from "./routes/hello";

const app = express();
app.use(express.json());

app.post("/hello", hello);

export const main = serverlessExpress({ app });
