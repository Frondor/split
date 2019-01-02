const { sync: loadFiles } = require("fast-glob");
const path = require("path");
const _ = require("lodash");

class ConfigService {
  constructor(dirName) {
    this.basePath = dirName;
    this.store = {};

    this.init();
  }

  init() {
    const files = loadFiles("./**/*.js", {
      onlyFiles: true,
      cwd: this.basePath,
      deep: 2,
      transform: fileName => ({
        name: fileName.replace(".js", "").replace("/", "."),
        contents: require(path.join(this.basePath, fileName))
      })
    });

    files.map(file => _.set(this.store, file.name, file.contents));
  }

  get(keyPath, defaults) {
    const value = _.get(this.store, keyPath);
    return value ? _.cloneDeep(value) : defaults;
  }

  set(keyPath, value) {
    _.set(this.store, keyPath, value);
  }
}

module.exports = ConfigService;
