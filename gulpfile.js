'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');

const { universalProject, testCaseProject } = require('./build-tools');

universalProject('channels-names-resolver', 'ElectronRPCUtils');
universalProject('server', 'ElectronRPCServer');
universalProject('client', 'ElectronRPCClient');
universalProject('electron-rpc', 'ElectronRPC');
testCaseProject('test-case', 'TestCase');

gulp.task('default', sequence(
    'channels-names-resolver',
    'server',
    'client',
    'electron-rpc',
    'test-case'
));
