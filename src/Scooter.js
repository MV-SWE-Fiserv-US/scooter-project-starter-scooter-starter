class Scooter {
  static nextSerial = 0;
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    this.charge = 100;
    this.isBroken = false;

    Scooter.nextSerial++;
  }

  rent(user) {
    if (this.charge < 20) {
      throw new Error("scooter needs to charge");
    }

    if (this.isBroken) {
      throw new Error("scooter needs repair");
    }
    this.user = user;
    this.station = null;
  }

  dock(station) {
    this.user = null;
    this.station = station;
  }

  async recharge() {
    console.log("Starting charge");
    return new Promise((resolve) => {
      let chargeInterval = setInterval(() => {
        if (this.charge >= 100) {
          this.charge = 100;
          console.log("Scooter is fully charged");
          clearInterval(chargeInterval);
          resolve();
        } else {
          console.log(`charge is at ${this.charge}%`);
          this.charge += 15;
        }
      }, 1);
    });
  }

  async requestRepair() {
    await new Promise((resolve) => setTimeout(resolve, 1));
    this.isBroken = false;
    console.log("repair complete");
  }
}

module.exports = Scooter;
