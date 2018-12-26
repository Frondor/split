const authConfig = require("../config/auth");

module.exports = class AuthService {
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

    const config = {
      ...authConfig.jwt,
      payload: {
        uid: user.id
      }
    };
    const jwt = new JsonWebToken(config);

    return jwt;
  }

  logout(jwt) {}

  can(jwt) {}
};
