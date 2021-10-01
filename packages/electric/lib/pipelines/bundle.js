// SPDX-FileCopyrightText: © 2017 Liferay International Ltd. <https://liferay.com>
//
// SPDX-License-Identifier: BSD-3-Clause

'use strict';

const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

function bundle(options) {
	options = options || {};

	const entries = options.entryPoints || {};
	const modules = options.modules || ['node_modules'];
	const uglify = options.uglify || false;

	return through.obj(
		function(file, enc, cb) {
			if (file.isNull()) {
				return cb(null, file);
			}

			if (file.isBuffer()) {
				try {
					const name = require(file.path).default.name;
					entries[name] = file.path;
				}
				catch(e) {
					gutil.log(`Error when trying to require the "${file.path}" file`);
					gutil.log(`Details: ${e.message}`);
				}
			}

			cb(null, file);
		},
		function(cb) {
			const plugins = [
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.CommonsChunkPlugin({
					filename: 'shared.electric.js',
					name: 'shared'
				})
			];

			if (uglify) {
				plugins.push(
					new UglifyJSPlugin({
						minimize: true
					})
				);

				gutil.log(
					'Uglifying bundle files for production. This might take a while...'
				);
			}

			webpack(
				{
					entry: entries,
					module: {
						rules: [
							{
								loader: path.join(__dirname, '../loader.js'),
								test: /\.soy$/
							}
						]
					},
					output: {
						filename: '[name].js',
						library: 'pageComponent',
						path: path.join(process.cwd(), options.dest, 'js', 'bundles')
					},
					plugins: plugins,
					resolve: {
						modules: modules
					}
				},
				function(err) {
					cb(err);
				}
			);
		}
	);
}

module.exports = bundle;
