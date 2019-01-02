const express = require("express");
const app = express();
// Import routes
const { login, logout, user } = require("./routes/auth");
// Import middleware
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser")();
const jwtParser = require("./middleware/auth");
const authRequired = [ cookieParser, jwtParser ];

const Config = require('./services/ConfigService');

const catchErrors = route => (...args) => route(...args).catch(args[2]);

// Global middleware
app.use(express.json());

// Route handlers
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/auth/login", catchErrors(login));
app.post("/auth/logout", catchErrors(logout));
app.get("/user", ...authRequired, catchErrors(user));
// app.get("/auth/refresh", (req, res) => res.send("Hello World!"));
app.use(errorHandler);

module.exports = app;
