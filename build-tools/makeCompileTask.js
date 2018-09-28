'use strict';

const gulp = require('gulp');
const typescript = require('typescript');
const ts = require('gulp-typescript');
const path = require('path');
const merge2 = require('merge2');

const TS_CONFIG_PATH = path.resolve(__dirname, '../tsconfig.json');

module.exports = (srcDir, distDir, tsConfigPath = TS_CONFIG_PATH) => {
    const srcPattern = [
        path.join(srcDir, '**/*.ts'),
        path.join(srcDir, '**/*.tsx')
    ];
    const project = ts.createProject(TS_CONFIG_PATH, { typescript });
    return () => {
        const tsResult = gulp.src(srcPattern).pipe(project());
        return merge2([
            tsResult.dts.pipe(gulp.dest(distDir)),
            tsResult.js.pipe(gulp.dest(distDir))
        ]);
    };
};
