module.exports = {
  jwt: {
    secret: 'MuchSecureSuchHardcodedString',
    algorithm: 'HS256',
    expiresIn: 60, // in secs, so 1h = 60*60
  },
  cookie: {
    name: 'token',
    httpOnly: true,
    secure: true,
    signed: false, // not needed since the cookie content is part of the already-signed JWT
  },
};
