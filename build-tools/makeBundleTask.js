'use strict';

const webpack = require('webpack');

/**
 * @typedef {Object} MakeBundleTaskParams
 * @property {string} entryPoint
 * @property {string} outDir
 * @property {string} jsFileName
 */

/**
 * @param {MakeBundleTaskParams} params 
 * @return {Function}
 */
const makeBundleTask = ({ entryPoint, outDir, jsFileName }) => (cb) => {
    webpack(
        {
            entry: entryPoint,
            output: {
                path: outDir,
                filename: jsFileName,
                library: 'ElectronRPC'
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?/,
                        use: {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.webpack.json'
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js', '.json']
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
