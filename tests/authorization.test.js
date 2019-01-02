const server = require("../src/server");
const request = require("supertest");
const cert = require("fs").readFileSync("./cert/server.cert");
const { AuthService } = require("../src/services");
const {
  VALID_USER_CREDENTIALS,
  INVALID_USER_CREDENTIALS
} = require("./_utils");

describe("Authorization middleware", () => {
  describe("TEST: VALID tokens", () => {
    describe("WHEN: GET /user", () => {
      it("SHOULD: return 200", async () => {
        const agent = await request
          .agent(server, { ca: cert })
          .connect({ "*": "https://localhost:3000" });

        const { token } = await agent
          .post("https://localhost:3000/auth/login")
          .send(VALID_USER_CREDENTIALS);

        response = await agent
          .withCredentials()
          .set("Authentication", "Bearer " + token)
          .get("/user");

        expect(response.body).toMatchObject({ uid: 2 });
      });
    });
  });

  // describe('TEST: Invalid tokens', () => {

  //   describe("WHEN: GET /user (authenticated)", () => {
  //     it("SHOULD: return 200", async () => {
  //       response = await request(app).get("/");
  //       expect(response.text).toBe("Hello World!");
  //     });
  //   });

  // })
});
