const path = require('path');
const AuthService = require('./AuthService');
const ConfigService = require('./ConfigService');

const Config = new ConfigService(path.join(__dirname, '../config'));
const Auth = new AuthService(Config.get('auth'));

module.exports = {
  Config,
  Auth,
};
