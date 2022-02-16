import * as path from 'path';
import * as webpack from 'webpack';
import * as child from 'child_process';

import CopyPlugin from 'copy-webpack-plugin';
import AwsSamPlugin from 'aws-sam-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';
import branchName from 'current-git-branch';

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = !isEnvProduction;

const awsSamPlugin = new AwsSamPlugin({ vscodeDebug: false });

const repositoryName = path.basename(__dirname);
const currentBranchName = process.env.commit || branchName().toString().replace('/', '-');
const commitHash = child.execSync('git rev-parse HEAD').toString().trim();

const awsSamEntryMap = awsSamPlugin.entry() as unknown as Record<string, string>;

const webpackConfig: webpack.Configuration = {
  name: 'server',
  mode: isEnvDevelopment ? 'development' : 'production',
  target: 'node',
  entry: () => awsSamEntryMap,
  devtool: isEnvDevelopment ? 'inline-source-map' : false,
  output: {
    filename: (chunkData) => awsSamPlugin.filename(chunkData),
    libraryTarget: 'commonjs2',
    path: path.resolve('.'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node : {
    __filename: true,
    __dirname: true,
  },
  externals: {
    fsevents: "require('fsevents')",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    awsSamPlugin,
    isEnvDevelopment && new CopyPlugin({
      patterns: Object.keys(awsSamEntryMap).map((lambdaName) => ([
          { from: './.env', to: `.aws-sam/build/${lambdaName}/` },
        ].filter(Boolean) as CopyPlugin.ObjectPattern[]
      )).flat(),
    }),
    isEnvProduction && new ZipPlugin({
      path: './dist',
      filename: `${repositoryName}-${currentBranchName}-${commitHash}`,
      pathMapper: function(assetPath) {
        return assetPath.replace('.aws-sam/build', '.');
      },
    }) as unknown as webpack.WebpackPluginInstance,
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
}

export default webpackConfig;
