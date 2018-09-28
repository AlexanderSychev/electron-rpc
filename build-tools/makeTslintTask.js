'use strict';

const path = require('path');
const gulp = require('gulp');
const lint = require('gulp-tslint');

const LINT_CONFIG_PATH = path.resolve(__dirname, '../tslint.json');

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
        .pipe(lint(LINT_CONFIG_PATH))
        .pipe(lint.report({
            summarizeFailureOutput: true
        }));
};
