const express = require("express");
const app = express();
const { login, logout, user } = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");
const jwt = require("express-jwt");

const catchErrors = route => (...args) => route(...args).catch(args[2]);

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/auth/login", catchErrors(login));
app.post("/auth/logout", catchErrors(logout));
app.get("/user", catchErrors(user));
// app.get("/auth/refresh", (req, res) => res.send("Hello World!"));
app.use(errorHandler);

module.exports = app;
