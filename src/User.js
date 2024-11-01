class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }
  login(password) {
    if (this.password === password) {
      this.loggedIn = true;
      return true;
    }
    throw new Error("incorrect password");
  }
  logout() {
    this.loggedIn = false;
    return true;
  }
}

module.exports = User;
