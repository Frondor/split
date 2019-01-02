const JsonWebToken = require("./JsonWebToken");

class AuthService {
  constructor(config) {
    this.config = config;
    this.baseHeader = new JsonWebToken({ ...this.config.jwt })
      .toString()
      .split(".", 1)[0];
  }

  get secret() {
    return this.config.jwt.secret;
  }

  getCookieOptions(overrides) {
    return { ...this.config.cookie, ...overrides };
  }

  async getUserFromCredentials(credentials = {}) {
    const { user, pass } = credentials;
    if (user !== "test_user" && pass !== "test_pass") {
      throw new Error("Invalid credentials");
    }

    return Promise.resolve({
      id: 1,
      name: "Jon Doe"
    });
  }

  async authenticate(credentials) {
    const user = await this.getUserFromCredentials(credentials);
    const payload = { uid: user.id };

    return new JsonWebToken(this.config.jwt, payload);
  }

  logout(jwt) {}

  can(jwt) {}
}

module.exports = AuthService;
