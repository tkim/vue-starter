import * as webpack from 'webpack';
import { merge, nodeExternals } from './utils';
import { baseServer } from './base-server';

export const devServer: webpack.Configuration = merge(baseServer, {
  entry: {
    'dev-server': './src/dev/server',
  },
  output: {
    filename: 'dev-server.js',
  },
  externals: [nodeExternals()],
}) as any;

export default devServer;
