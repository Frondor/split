const express = require('express');
const app = express();
// Import routes
const { login, logout, user } = require('./routes/auth');
// Import middleware
const errorHandler = require('./middleware/errorHandler');
const authRequired = require('./middleware/auth');

// Catch errors from async handlers and pass them to
// errorHandler using next(err)
const catchErrors = routeHandler => (...args) =>
  routeHandler(...args).catch(args[2]);

// Global middleware
app.use(express.json());

// Route handlers
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/auth/login', catchErrors(login));
app.post('/auth/logout', ...authRequired, catchErrors(logout));
app.get('/user', ...authRequired, catchErrors(user));
app.use(errorHandler);

module.exports = app;
