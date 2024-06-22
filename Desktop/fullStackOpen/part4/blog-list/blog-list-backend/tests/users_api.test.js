const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../main");

const api = supertest(app);

test("invalid users cannot be created", async () => {
  // a user needs a unique username, at least 3 chars long and password at least 3 chars long
  const invalidUser = {
    username: "ta",
    name: "whatever",
    password: "something",
  };
  await api.post("/api/users").send(invalidUser).expect(400);
});
