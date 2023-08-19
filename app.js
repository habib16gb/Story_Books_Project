import express from "express";
import { config } from "dotenv";
import colors from "colors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import passportConfig from "./config/passport.js";

config();
passportConfig(passport);
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");

// Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// passport middelware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("static"));

app.use("/", router);

app.listen(PORT, () =>
  console.log(
    `server started in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      .bgGreen.bold
  )
);
