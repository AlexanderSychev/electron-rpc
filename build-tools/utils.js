'use strict';

const $rimraf = require('rimraf');
const $mkdirp = require('mkdirp');
const $glob = require('glob');
const fs = require('fs');

/**
 * Promisified "rimraf"
 * @param {string} directory
 * @return {Promise<void>} 
 */
const rimraf = (directory) => new Promise(
    (resolve, reject) => $rimraf(directory, err => err ? reject(err) : resolve())
);

/**
 * Promisified "mkdirp"
 * @param {string} directory
 * @return {Promise<void>} 
 */
const mkdirp = (directory) => new Promise(
    (resolve, reject) => $mkdirp(directory, err => err ? reject(err) : resolve())
);

/**
 * Promisified "glob"
 * @param {string} pattern 
 * @param {Object} [options] 
 * @return {Promise<string[]>}
 */
const glob = (pattern, options) => new Promise(
    (resolve, reject) => $glob(pattern, options, (err, matches) => err ? reject(err): resolve(matches))
);

/**
 * @param {string | number | Buffer | URL} path
 * @param {string | Object} options
 * @return {Promise<string|Buffer>}
 */
const readFile = (path, options) => new Promise(
    (resolve, reject) => fs.readFile(path, options, (err, data) => err ? reject(err) : resolve(data))
);

/**
 * @param {string | number | Buffer | URL} path
 * @param {*} data
 * @param {string | Object} [options]
 * @return {Promise<string|Buffer>}
 */
const writeFile = (path, data, options) => new Promise(
    (resolve, reject) => fs.writeFile(path, data, options, (err) => err ? reject(err) : resolve())
);

module.exports = { rimraf, mkdirp, glob, readFile, writeFile };
