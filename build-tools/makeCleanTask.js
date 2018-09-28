'use strict';

const $rimraf = require('rimraf');
const $mkdirp = require('mkdirp');

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
 * Make clean directories task which removes directory with all contents
 * and recreates it
 * @param {string | string[]} dirs 
 * @return {Function}
 */
module.exports = (dirs) => {
    dirs = Array.isArray(dirs) ? dirs : [dirs];
    return async() => {
        await Promise.all(dirs.map(dir => rimraf(dir)));
        await Promise.all(dirs.map(dir => mkdirp(dir)));
    };
}
