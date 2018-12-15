import * as webpack from 'webpack';
import { isDev, merge, nodeExternals, vueStarterRoot } from './utils';
import { baseServer } from './base-server';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');

export let server = merge(baseServer, {
  entry: [vueStarterRoot('src/server/index')],
  output: {
    filename: 'server.js',
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  plugins: [
    new CopyWebpackPlugin([
      { from: vueStarterRoot('src/static'), to: '../static' },
      { from: vueStarterRoot('src/app/config/*.json'), to: 'app/config', flatten: true },
    ]),
  ],
});

if (isDev) {
  server = merge(server, {
    watch: true,
    entry: ['webpack/hot/poll?1000'],
    plugins: [
      new StartServerPlugin({
        name: 'server.js',
        nodeArgs: ['--inspect'],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
}

export default server;
