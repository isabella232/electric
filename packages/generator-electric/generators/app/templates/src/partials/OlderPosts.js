// SPDX-FileCopyrightText: © 2018 Liferay International Ltd. <https://liferay.com>
//
// SPDX-License-Identifier: BSD-3-Clause

'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';

import templates from './OlderPosts.soy.js';

class OlderPosts extends Component {
	attached() {
		this.filterPosts();
	}

	filterPosts() {
		if (this.blogObject && this.url) {
			const posts = [];

			for (const i in this.blogObject.childIds) {
				const childId = this.blogObject.childIds[i];
				const post = this.blogObject.children[childId];

				if (this.url !== post.url) {
					posts.push(post);
				}
			}

			this.posts = posts.slice(0, 3);
		}
	}
};

OlderPosts.STATE = {
	blogObject: {},
	url: {},
	posts: {
		internal: true,
		value: [],
	}
}

Soy.register(OlderPosts, templates);

export default OlderPosts;
