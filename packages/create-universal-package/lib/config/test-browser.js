const babel = require('rollup-plugin-babel');
const multiEntry = require('rollup-plugin-multi-entry');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('@lhorie/rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const browserConfig = require('./browser-config.js');

const template = ({env}) => `${env}.js`;

module.exports = (userBabelConfig) => ({
  formats: ['iife'],
  template,
  plugins: [
    multiEntry({exports: false}),
    resolve({browser: true}),
    commonjs({include: 'node_modules/**'}),
    babel(Object.assign({}, browserConfig(userBabelConfig), {exclude: 'node_modules/**'})),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
});
