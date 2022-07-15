const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyPlugin = require('copy-webpack-plugin');
const AwsSamPlugin = require('aws-sam-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: Object.keys((new AwsSamPlugin({ vscodeDebug: false }).entry())).map((lambdaName) => ([
        { from: './.env', to: `.aws-sam/build/${lambdaName}/`, noErrorOnMissing: true },
      ])).flat()
    }),
  ]
});
