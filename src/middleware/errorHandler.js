module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: {
        name: err.name,
        code: 'EUNAUTH',
      },
    });
  }

  // const stack = process.env.NODE_ENV !== "production" && err.stack;
  const stack = err.stack;

  res.status(500).json({ error: err, stack });
};
