// import cors from 'cors';
import express from "express";
import { router } from "./src/routes/routes";
import configDotenv from "./src/config/dotenv";

configDotenv();
const app = express();


// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3333, () => {
  console.log(
    `⚡️[${process.env.APP_NAME}]: Server is running at http://localhost:3333`
  );
});