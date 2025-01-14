const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");
const usersRouter = require("./routes/api/usersRouter");
const viewsRouter = require("./routes/api/viewsRouter");

// initialize application
const app = express();

// // коли робимо запит на сервер, в консолі відображається інформація про запит
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(morgan(formatsLogger));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

mongoose
  .connect(process.env.MONGO_URL)
  .then((connection) => {
    console.log("Database connection successful :)");
  })
  .catch((error) => {
    console.log(error);

    // (якщо код не 0, це означає, що щось не так); 1 - сервер повернув помилку, цю помилку ми логаємо
    process.exit(1);
  });

// cors middleware
app.use(cors());

// parse request body
app.use(express.json());

// Serve static files
app.use(express.static("public"));

// Global middleware
app.use((req, res, next) => {
  req.time = new Date().toLocaleString("uk-UA");

  next();
});

app.use("/", viewsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  const msg = Array.isArray(err.message) ? err.message.join(";") : err.message;

  res.status(err.status || 500).json({
    msg,
    stack: err.stack,
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Oops, resource not found :[...",
  });
});

module.exports = app;
