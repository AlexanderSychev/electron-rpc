'use strict';

const { rimraf, mkdirp } = require('./utils');

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
