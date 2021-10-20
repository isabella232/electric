// SPDX-FileCopyrightText: © 2017 Liferay International Ltd. <https://liferay.com>
//
// SPDX-License-Identifier: BSD-3-Clause

'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');

const runSequence = require('run-sequence').use(gulp);

const registerTasks = require('../../index').registerTasks;
const sitePath = path.join(
	__dirname,
	'../../../test/fixtures/sites/rss-generator-site'
);

beforeAll(() => {
	process.chdir(sitePath);

	registerTasks({
		gulp: gulp
	});
});

afterAll(done => {
	runSequence('clean', function() {
		done();
	});
});

test('it should generate glob.rss file',
	done => {
		runSequence('front-matter', function() {
			const config = {encoding: 'utf8'};
			const rssFeed = fs.readFileSync(
				path.join(sitePath, 'dist/blog/rss.xml'),
				config
			);
			const rssArr = rssFeed.split('\n');

			_.remove(rssArr, function(n) {
				return n.includes('<pubDate>') || n.includes('<lastBuildDate>');
			});

			expect(rssArr.join('\n')).toMatchSnapshot();

			done();
		});
	}
);
