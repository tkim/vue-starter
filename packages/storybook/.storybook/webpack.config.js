const webpack = require('webpack');
const base = require('@vue-starter/webpack/dist/config/base').default;
const path = require('path');

module.exports = (storybookBaseConfig, env, defaultConfig) => {
  const config = defaultConfig;

  config.resolve = base.resolve;
  config.module.rules = base.module.rules;

  config.plugins.push(new webpack.DefinePlugin({ PRODUCTION: false, DEVELOPMENT: true, CLIENT: true, TEST: true }));

  config.resolve.modules.push(path.join(path.resolve(__dirname), '..', 'node_modules'));

  return config;
};
