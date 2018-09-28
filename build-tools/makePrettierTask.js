'use strict';

const gulp = require('gulp');
const prettier = require('gulp-prettier');
const path = require('path');

const PRETTIER_CONFIG = require('../.prettierrc.json');

/**
 * @param {string} dir
 * @return {Function}
 */
module.exports = (dir) => {
    const patterns = [
        path.join(dir, '**', '*.ts'),
        path.join(dir, '**', '*.tsx')
    ];
    return () => gulp.src(patterns)
        .pipe(prettier(PRETTIER_CONFIG))
        .pipe(gulp.dest(dir));
};
