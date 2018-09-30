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
const makePugTask = require('./makePugTask');

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
    const externalPath = path.join(
        PACKAGES_DIR,
        'electron-rpc',
        'lib',
        'electron-rpc.min.js'
    );

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
    const externals = `${packageName}:externals`;
    const pug = `${packageName}:pug`;

    gulp.task(compileTask, makeCompileTask(
        path.join(srcDir, 'electron'),
        path.join(distDir, 'electron')
    ));
    gulp.task(bundleTask, makeBundleTask({
        library,
        entryPoint: path.join(srcDir, 'frontend', 'index.ts'),
        outDir: path.join(distDir, 'frontend'),
        jsFileName: `app.js`
    }));
    gulp.task(externals, () => gulp.src(externalPath).pipe(gulp.dest(
        path.join(distDir, 'frontend')
    )));
    gulp.task(pug, makePugTask(
        path.join(srcDir, 'frontend', 'index.pug'),
        path.join(distDir, 'frontend')
    ));
    gulp.task(buildTask, [bundleTask, compileTask, externals, pug]);

    gulp.task(cleanTask, makeCleanTask(distDir));

    gulp.task(lintTask, makeTslintTask(srcDir));
    gulp.task(prettierTask, makePrettierTask(srcDir));
    gulp.task(combTask, sequence(prettierTask, lintTask));

    gulp.task(beforeBuildTask, [combTask, cleanTask]);

    gulp.task(packageName, sequence(beforeBuildTask, buildTask));

    gulp.task(unitTestsTask, makeMochaTasks(distDir, 'unit.js'));
};
