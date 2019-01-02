class Blacklist {
  constructor() {
    this.store = {};
    this.timers = {};
  }

  get(key) {
    return this.store[key];
  }

  set(key, value, { ttl }) {
    this.store[key] = value;
    if (ttl) {
      this.timers[key] = setTimeout(() => this.delete(key), ttl);
    }
  }

  delete(key) {
    delete this.store[key];
    if (this.timers[key]) {
      delete this.timers[key];
      clearTimeout(this.timers[key]);
    }
  }
}

module.exports = Blacklist;
