'use strict';

const path = require('path');

module.exports = {
    mode: 'production',
    target: 'electron-renderer',
    entry: ['reflect-metadata', path.join(__dirname, 'src', 'frontend', 'index.ts')],
    output: {
        path: path.join(__dirname, 'dist', 'frontend'),
        filename: 'electron-rpc-test-case.min.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            '@babel/env',
                            {
                                modules: false,
                                useBuiltIns: 'usage',
                                targets: {
                                    browsers: ['last 1 version'],
                                    safari: '9',
                                    ie: '11',
                                    ios: '9',
                                    android: '4',
                                },
                            },
                        ],
                        '@babel/typescript',
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                        '@babel/plugin-syntax-dynamic-import',
                    ],
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    externals: {
        'electron-rpc-common': 'ElectronRPC',
    },
};
