module.exports = {
  jwt: {
    secret: "MuchSecureSuchHardcodedString",
    algorithm: "HS256",
    // expiresIn: '1h',
    // timeToLive: '2d'
  },
  cookie: {
    httpOnly: true,
    secure: true,
    // maxAge: jwt.payload.ttl,
    signed: false // not needed since the cookie content is part of the already-signed JWT
  }
};
