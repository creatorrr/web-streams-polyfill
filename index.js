require("babel-register")({
  presets: [
    require("babel-preset-env")
  ]
});

require("babel-polyfill");

module.exports = require("./index.es6");
