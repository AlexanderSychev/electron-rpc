'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');

const { universalProject, testCaseProject } = require('./build-tools');

universalProject('utils', 'ElectronRPC');
universalProject('server', 'ElectronRPC');
universalProject('client', 'ElectronRPC');
universalProject('common', 'ElectronRPC');
universalProject('async-queue', 'ElectronRPC', true);
universalProject('server-controllers', 'ElectronRPC');
universalProject('client-services', 'ElectronRPC');
testCaseProject('test-case', 'TestCase');

gulp.task('default', sequence(
    'utils',
    'server',
    'server-controllers',
    'client',
    'client-services',
    'common',
    'test-case'
));
