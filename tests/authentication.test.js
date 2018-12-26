const app = require("../src/app");
const request = require("supertest");

const VALID_USER_CREDENTIALS = {
  user: "test_user",
  pass: "test_user"
};

const INVALID_USER_CREDENTIALS = {
  user: "wrong_user"
};

describe("Autentication middleware", () => {
  describe("WHEN: GET /", () => {
    it("SHOULD: render Welcome message", async () => {
      response = await request(app).get("/");
      expect(response.text).toBe("Hello World!");
    });
  });

  describe("WHEN: Login with valid credentials", () => {
    it("SHOULD: Return a splitted JWT in body and set httpsOnly cookie", async () => {
      response = await request(app)
        .post("/auth/login")
        .send(VALID_USER_CREDENTIALS);
      debugger;
      expect(response.headers["set-cookie"][0]).toMatch(
        /HttpOnly.*Secure|Secure.*HttpOnly/
      );
      expect(response.body.token).toBeTruthy();
    });
  });

  // describe("WHEN: Login with invalid credentials", () => {
  //   it("SHOULD: Return 401", async () => {
  //     response = await request(app)
  //       .post("/auth/login")
  //       .send(INVALID_USER_CREDENTIALS)
  //       .expect(401);
  //   });
  // });
});
