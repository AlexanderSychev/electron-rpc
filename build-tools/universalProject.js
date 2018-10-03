'use strict';

const path = require('path');
const gulp = require('gulp');
const sequence = require('gulp-sequence');

const makeCompileTask = require('./makeCompileTask');
const makeCleanTask = require('./makeCleanTask');
const makeBundleTask = require('./makeBundleTask');
const makePrettierTask = require('./makePrettierTask');
const makeTslintTask = require('./makeTslintTask');
const makeMochaTasks = require('./makeMochaTasks');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const BASE_PREFIX = 'electron-rpc';

/**
 * Define universal (with bundle) project
 * @param {string} packageName Name of package
 * @param {string} library Frontend version global variable
 */
module.exports = (packageName, library) => {
    // Directories
    const packageDir = path.join(
        PACKAGES_DIR,
        packageName === BASE_PREFIX ?
            packageName : `${BASE_PREFIX}-${packageName}`
    );
    const srcDir = path.join(packageDir, 'src');
    const distDir = path.join(packageDir, 'dist');
    const libDir = path.join(packageDir, 'lib');
    const jsFileName =
        packageName === BASE_PREFIX ?
        `${packageName}.min.js` :
        `${BASE_PREFIX}-${packageName}.min.js`;

    // Task names
    const bundleTask = `${packageName}:bundle`;
    const compileTask = `${packageName}:compile`;
    const buildTask = `${packageName}:build`;
    const cleanTask = `${packageName}:clean`;
    const lintTask = `${packageName}:lint`;
    const prettierTask = `${packageName}:prettier`;
    const combTask = `${packageName}:comb`;
    const beforeBuildTask = `${packageName}:before-build`;
    const unitTestsTask = `${packageName}:unit-tests`;

    gulp.task(compileTask, makeCompileTask(srcDir, distDir));
    gulp.task(bundleTask, makeBundleTask({
        jsFileName,
        library,
        entryPoint: path.join(srcDir, 'index.ts'),
        outDir: libDir
    }));
    gulp.task(buildTask, [bundleTask, compileTask]);

    gulp.task(cleanTask, makeCleanTask([distDir, libDir]));

    gulp.task(lintTask, makeTslintTask(srcDir));
    gulp.task(prettierTask, makePrettierTask(srcDir));
    gulp.task(combTask, sequence(prettierTask, lintTask));

    gulp.task(beforeBuildTask, [combTask, cleanTask]);

    gulp.task(packageName, sequence(beforeBuildTask, buildTask));

    gulp.task(unitTestsTask, makeMochaTasks(distDir, 'unit.js'));
};
