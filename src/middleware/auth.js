const cookieParser = require('cookie-parser')();
const { Auth } = require('../services');

const jwtParser = require('express-jwt')({
  credentialsRequired: true,
  secret: Auth.secret,
  userProperty: 'jwtPayload',
  getToken: req => {
    const header = Auth.baseHeader;
    const payload = (req.get('authorization') || '').substr(7); // "Bearer "
    const signature = req.cookies.token;

    return `${header}.${payload}.${signature}`;
  },
  isRevoked: async (req, payload, next) => {
    if (await Auth.isTokenRevoked(payload.jid)) {
      const err = new Error('Invalid token');
      err.name = 'UnauthorizedError';
      next(err);
    } else next();
  },
});

module.exports = [cookieParser, jwtParser];
