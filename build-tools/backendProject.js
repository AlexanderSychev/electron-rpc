'use strict';

const path = require('path');
const gulp = require('gulp');
const sequence = require('gulp-sequence');

const makeCleanTask = require('./makeCleanTask');
const makeCompileTask = require('./makeCompileTask');
const makePrettierTask = require('./makePrettierTask');
const makeTslintTask = require('./makeTslintTask');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const BASE_PREFIX = 'electron-rpc';

/**
 * Define backend (without bundle) project
 * @param {string} packageName
 */
module.exports = (packageName) => {
    const packageDir = path.join(PACKAGES_DIR, `${BASE_PREFIX}-${packageName}`);
    const srcDir = path.join(packageDir, 'src');
    const distDir = path.join(packageDir, 'dist');
    const buildTask = `${packageName}:build`;
    const cleanTask = `${packageName}:clean`;
    const lintTask = `${packageName}:lint`;
    const prettierTask = `${packageName}:prettier`;
    const combTask = `${packageName}:comb`;
    const beforeBuildTask = `${packageName}:before-build`;

    gulp.task(buildTask, makeCompileTask(srcDir, distDir));
    gulp.task(cleanTask, makeCleanTask(distDir));

    gulp.task(lintTask, makeTslintTask(srcDir));
    gulp.task(prettierTask, makePrettierTask(srcDir));
    gulp.task(combTask, sequence(prettierTask, lintTask));

    gulp.task(beforeBuildTask, [combTask, cleanTask]);

    gulp.task(packageName, sequence(beforeBuildTask, buildTask));
};
