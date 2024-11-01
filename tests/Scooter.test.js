const Scooter = require("../src/Scooter");
const User = require("../src/User");

//typeof scooter === object
describe("scooter object", () => {
  test("Scooter class should create Scooter instance", () => {
    const scooter = new Scooter();
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

describe("scooter properties", () => {
  const scooter = new Scooter("Downtown");
  it("Should have station, user, serial, charge, and isBroken properties", () => {
    expect(scooter).toHaveProperty("station", "Downtown");
    expect(scooter).toHaveProperty("user", null);
    expect(scooter).toHaveProperty("serial", 0);
    expect(scooter).toHaveProperty("charge", 100);
    expect(scooter).toHaveProperty("isBroken", false);
  });
});

//Method tests
describe("scooter methods", () => {
  const scooter = new Scooter("Downtown");
  const user = new User("Joe Bloggs", "test123", 21);
  describe("Rent method", () => {
    //rent method
    it("Should rent the scooter out to a user only if it meets the requirments", () => {
      expect(user).toBeInstanceOf(User);
      expect(scooter.charge).toBeGreaterThan(20);
      expect(scooter.isBroken).toBeFalsy();
    });

    it("Should update the user and station", () => {
      scooter.rent(user);
      expect(scooter.user).toBe(user);
      expect(scooter.station).toBeNull();
    });

    it("Should throw error if the scooter needs be charged", () => {
      scooter.charge = 15;
      expect(() => scooter.rent(user)).toThrow("scooter needs to charge");
    });

    it("Should throw error if the scooter is broken", () => {
      scooter.charge = 100;
      scooter.isBroken = true;
      expect(() => scooter.rent(user)).toThrow("scooter needs repair");
    });
  });

  describe("Dock method", () => {
    //dock method
    it("Should clear out the user", () => {
      scooter.dock("Downtown");
      expect(scooter.user).toBeNull();
    });

    it("Should update the station", () => {
      expect(scooter.station).toEqual("Downtown");
    });
  });

  //requestRepair method
  it("Should charge to 100 with requestRepaid method", async () => {
    scooter.charge = 15;
    await scooter.recharge();
    expect(scooter.charge).toBe(100);
  });

  //charge method
  it("Should repair the scooter", async () => {
    scooter.isBroken = true;
    await scooter.requestRepair();
    expect(scooter.isBroken).toBeFalsy();
  }, 6000);
});
