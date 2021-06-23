const { merge } = require('webpack-merge');
const development = require('./webpack.development.js');

module.exports = merge(development, {
  watch: true
});
