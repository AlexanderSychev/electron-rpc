'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');

const { universalProject } = require('./build-tools');

universalProject('channels-names-resolver', 'ElectronRPCUtils');
universalProject('server', 'ElectronRPCServer');
universalProject('client', 'ElectronRPCClient');
universalProject('electron-rpc', 'ElectronRPC');

gulp.task('build-libs', ['server', 'client'])
gulp.task('default', sequence('channels-names-resolver', 'build-libs', 'electron-rpc'));
