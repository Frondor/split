class JsonWebToken {
  constructor(jwt = '') {
    this.token = token;
  }

  toString() {
    return this.token;
  }

  toJSON() {
    return this.payload;
  }
}

class AuthService {
  async login(credentials) {
    const user = await this.authenticate(credentials);

    if () {
    }

    return jwt;
  }

  logout(jwt) {

  }

  can(jwt) {

  }
}

module.exports = {
  auth: new AuthService()
};
