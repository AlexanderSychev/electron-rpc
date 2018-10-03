'use strict';

const path = require('path');
const webpack = require('webpack');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const NODE_MODULES = path.resolve(__dirname, '../node_modules');

const PREFIX = 'electron-rpc';

const PACKAGES = [
    'electron-rpc',
    'client',
    'server',
    'test-case'
];

/**
 * @typedef {Object} MakeBundleTaskParams
 * @property {string} entryPoint
 * @property {string} outDir
 * @property {string} jsFileName
 * @property {string} library
 * @property {string} packageName
 */

/**
 * @param {MakeBundleTaskParams} params 
 * @return {Function}
 */
const makeBundleTask = ({
    entryPoint,
    outDir,
    jsFileName,
    library
}) => (cb) => {
    webpack(
        {
            entry: entryPoint,
            output: {
                library,
                path: outDir,
                filename: jsFileName,
                libraryTarget: 'window'
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?/,
                        use: {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.webpack.json',
                                onlyCompileBundledFiles: true
                            }
                        }
                    }
                ]
            },
            externals: {
                'electron': '__electron__',
                'electron-rpc-common': 'ElectronRPC'
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js', '.json']
            },
            optimization: {
                minimize: true
            }
        },
        (err, stats) => {
            if (err) {
                console.err(err);
                cb();
            } else {
                console.log(stats.toString({ colors: true }));
                cb();
            }
        }
    )
}

module.exports = makeBundleTask;
