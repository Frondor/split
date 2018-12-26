const express = require("express");
const app = express();
const { login, logout, user } = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");
const jwt = require("express-jwt");

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/auth/login", login);
app.post("/auth/logout", logout);
app.get("/user", user);
// app.get("/auth/refresh", (req, res) => res.send("Hello World!"));
app.use(errorHandler);

module.exports = app;
