'use strict';

const pug = require('pug');
const fs = require('fs');

const srcPath = process.argv[2];
const destPath = process.argv[3];

const template = pug.compileFile(srcPath);

fs.writeFileSync(destPath, template(), 'utf-8');
