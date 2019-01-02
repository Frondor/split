const path = require('path');
const AuthService = require("./AuthService");
const ConfigService = require("./ConfigService");
const BlacklistService = require("./BlacklistService");

const Config = new ConfigService(path.join(__dirname, '../config'));
const Auth = new AuthService(Config.get("auth"));
const Blacklist = new BlacklistService();

module.exports = {
  Config,
  Auth,
  Blacklist
};
