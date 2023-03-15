const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "./.env" });

const contactsRouter = require("./routes/api/contactsRouter");

// initialize application
const app = express();

// // коли робимо запит на сервер, в консолі відображається інформація про запит
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(morgan(formatsLogger));

// cors middleware
app.use(cors());

// parse request body
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  req.time = new Date().toLocaleString("uk-UA");

  next();
});

app.use("/api/contacts", contactsRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    msg: err.message,
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Oops, resource not found...",
  });
});

module.exports = app;
