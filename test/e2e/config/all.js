const {configBuild} = require("@testing/wdio-config");
const {config} = require("./base.conf");

const android = require("./android");
const ios = require("./ios");
const browser = require("./browser");

exports.config = configBuild(config, {
  baseUrl: 'http://localhost:8001/index.html',
  capabilities: [
    android.web,
    ios.web,
    ...browser.all,
  ]
}, process.env.GRID_USER ? {} : {
  port: 4723,
  services: ['appium']
});
