// SPDX-FileCopyrightText: © 2016 Liferay International Ltd. <https://liferay.com>
//
// SPDX-License-Identifier: BSD-3-Clause

'use strict';

module.exports = function(options) {
	const gulp = options.gulp;
	const runSequence = options.runSequence;
	const taskPrefix = options.taskPrefix;
	const plugins = [];

	options.plugins.forEach(plugin => {
		if (plugin.name) {
			plugins.push(plugin.name);
		}
	});

	gulp.task(taskPrefix + 'build', function(cb) {
		const compileTasks = [];

		if (!options.skipBundle) {
			compileTasks.push(taskPrefix + 'metal');
		}

		const tasks = [
			taskPrefix + 'clean',
			[
				taskPrefix + 'front-matter',
				taskPrefix + 'static',
				taskPrefix + 'styles',
				taskPrefix + 'vendor'
			],
			compileTasks
		];

		if (!options.debug) {
			tasks.push(taskPrefix + 'clean:temp');
		}

		runSequence.apply(null, tasks.concat(plugins, cb));
	});
};
