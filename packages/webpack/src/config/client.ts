import * as webpack from 'webpack';
import { isProd, merge, vueStarterRoot } from './utils';
import { base } from './base';

const HTMLPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

export const client: webpack.Configuration = merge(base, {
  entry: {
    app: vueStarterRoot('src/client/index'),
  },
  output: {
    path: vueStarterRoot('dist/client'),
    filename: '[name].[chunkHash].js',
    publicPath: '/client/',
    chunkFilename: '[name].[id].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 318000,
    maxAssetSize: 267000,
  },
  plugins: [
    new webpack.DefinePlugin({ CLIENT: true, SERVER: false }),
    new HTMLPlugin({ template: vueStarterRoot('src/index.template.html'), spa: false }),
  ],
}) as any;

if (isProd) {
  client.plugins = (client.plugins || []).concat([
    new ServiceWorkerWebpackPlugin({ entry: vueStarterRoot('src/client/sw.ts') }),
    new CompressionPlugin({ algorithm: 'gzip', test: /\.js$|\.css$|\.html$/, threshold: 0, minRatio: 1 }),
  ]);
  (client as any).performance.hints = 'error';
}

export default client;
