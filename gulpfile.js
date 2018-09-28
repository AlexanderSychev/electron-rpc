'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');

const { backendProject, frontendProject } = require('./build-tools');

backendProject('channels-names-resolver');
backendProject('server');
frontendProject('client');

gulp.task('build-libs', ['server', 'client'])
gulp.task('default', sequence('channels-names-resolver', 'build-libs'))

