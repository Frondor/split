module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }

  // const stack = process.env.NODE_ENV !== "production" && err.stack;
  const stack = err.stack;

  res.status(500).json({ error: err, stack });
};
