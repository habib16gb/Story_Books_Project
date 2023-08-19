import express from "express";
import { config } from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";

config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.listen(PORT, () =>
  console.log(
    `server started in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      .bgGreen.bold
  )
);
