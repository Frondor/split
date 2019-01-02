const jsonwebtoken = require("jsonwebtoken");

module.exports = class JsonWebToken {
  constructor({ secret, algorithm }, payload = {}) {
    this.secret = secret;
    this.algorithm = algorithm;

    this.payload = { ...payload };
    this.token = this.sign();
  }

  sign() {
    return jsonwebtoken.sign(this.payload, this.secret, {
      algorithm: this.algorithm,
      mutatePayload: true
    });
  }

  toString() {
    return this.token;
  }

  toJSON() {
    return this.token;
  }
};
