const JsonWebToken = require('./JsonWebToken');
const BlacklistService = require('./BlacklistService');

class AuthService {
  constructor(config) {
    this.config = config;
    this.baseHeader = new JsonWebToken({ ...this.config.jwt }).toString().split('.', 1)[0];

    // Fake in-memory storage
    this.blacklist = new BlacklistService();
  }

  get secret() {
    return this.config.jwt.secret;
  }

  getCookieOptions(overrides) {
    return { ...this.config.cookie, ...overrides };
  }

  async getUserFromCredentials(credentials = {}) {
    const { user, pass } = credentials;
    if (user !== 'test_user' && pass !== 'test_pass') {
      throw new Error('Invalid credentials');
    }

    return Promise.resolve({
      id: 1,
      name: 'Jon Doe',
    });
  }

  async authenticate(credentials) {
    const user = await this.getUserFromCredentials(credentials);
    const payload = { uid: user.id };

    return new JsonWebToken({
      ...this.config.jwt,
      payload,
    });
  }

  async isTokenRevoked(jid) {
    return await this.blacklist.get(jid);
  }

  async revokeToken(jid, exp) {
    const ttl = exp * 1000 - Date.now();
    return await this.blacklist.set(jid, true, { ttl });
  }

  // can(jwt) {}
}

module.exports = AuthService;
