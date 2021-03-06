require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "https://oyameles.herokuapp.com/"],
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const lotesRouter = require("./routes/lotes");
const ventasRouter = require("./routes/ventas");
const usersRouter = require("./routes/users");
const pagosRouter = require("./routes/pagos");

app.use("/api/lotes", lotesRouter);
app.use("/api/ventas", ventasRouter);
app.use("/api/users", usersRouter);
app.use("/api/pagos", pagosRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
