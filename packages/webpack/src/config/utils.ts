import * as path from 'path';
import * as webpackMerge from 'webpack-merge';
import * as externals from 'webpack-node-externals';

export const packageRoot = (dir: any) => {
  return path.join(__dirname, '..', '..', dir);
};
export const vueStarterRoot = (dir: any) => {
  return path.join(process.cwd(), '..', '..', dir);
};
export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const analyze = process.env.ANALYZE;
export const merge = webpackMerge;
export const nodeExternals = externals;
