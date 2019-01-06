const jsonwebtoken = require('jsonwebtoken');

module.exports = class JsonWebToken {
  constructor(config) {
    const { secret, algorithm, expiresIn, payload = {} } = config;
    this.secret = secret;
    this.algorithm = algorithm;

    this.payload = { ...payload };
    this.payload.iat = Math.floor(Date.now() / 1000);
    this.payload.exp = this.payload.iat + expiresIn;
    this.payload.jid = `${this.payload.uid}:${this.payload.iat}`;
  }

  sign() {
    return jsonwebtoken.sign(this.payload, this.secret, {
      algorithm: this.algorithm,
      mutatePayload: true,
    });
  }

  toString() {
    if (!this.token) this.token = this.sign();
    return this.token;
  }

  toJSON() {
    return this.toString();
  }
};
