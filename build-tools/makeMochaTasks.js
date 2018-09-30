'use strict';

const path = require('path');
const gulp = require('gulp');
const mocha = require('gulp-mocha');

/**
 * Mocha tests task factory
 * @param {string} testsDir
 * @param {(string | string[])} extensions
 */
module.exports = (testsDir, extensions) => {
    extensions = Array.isArray(extensions) ? extensions : [ extensions ]
    const patterns = extensions.map(
        extension => path.join(testsDir, '**', `*.${extension}`)
    );
    return () => gulp.src(patterns, { read: false }).pipe(mocha());
}
