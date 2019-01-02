const { Auth } = require("../services");
// const Config = require();
const jwtParser = require("express-jwt")({
  credentialsRequired: true,
  secret: Auth.secret,
  userProperty: 'jwtPayload',
  getToken: req => {

    const header = Auth.baseHeader;
    const payload = (req.get("authorization") || "").substr(7); // "Bearer "
    const signature = req.cookies.token;

    return `${header}.${payload}.${signature}`;
  }
});

module.exports = jwtParser;
