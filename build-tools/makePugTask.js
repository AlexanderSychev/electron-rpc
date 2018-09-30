'use strict';

const pug = require('gulp-pug');
const path = require('path');
const gulp = require('gulp');

/**
 * @param {string} srcFile 
 * @param {string} targetDir 
 * @return {Function}
 */
module.exports = (srcFile, targetDir) =>
    () => gulp.src(srcFile).pipe(pug()).pipe(gulp.dest(targetDir));
