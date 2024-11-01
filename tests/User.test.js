const User = require("../src/User");

const user = new User("Joe Bloggs", "test123", 21);

// User tests here
describe("User property tests", () => {
  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  });
  // test password

  test("Should have a password property", () => {
    expect(user).toHaveProperty("password", "test123");
  });


  // test age
  test("Should have a age property", () => {
    expect(user).toHaveProperty("age", 21);
  });

  test("Should have loggedIn property that initializes with false", () => {
    expect(user.loggedIn).toBeFalsy();
  });
});

describe("User methods", () => {
  // test login
  test("Should throw an error if password is incorrect", () => {
    expect(() => user.login("test321")).toThrow("incorrect password");
  });

  test("Should log the user in if password is correct", () => {
    user.login("test123");
    expect(user.loggedIn).toBeTruthy();
  });

  // test logout
  test("Should log the user out", () => {
    user.logout();
    expect(user.loggedIn).toBeFalsy();
  });
});
