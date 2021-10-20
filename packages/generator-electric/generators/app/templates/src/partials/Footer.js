// SPDX-FileCopyrightText: © 2018 Liferay International Ltd. <https://liferay.com>
//
// SPDX-License-Identifier: BSD-3-Clause

'use strict';

import {isServerSide} from 'metal';
import Component from 'metal-component';
import Soy from 'metal-soy';

import templates from './Footer.soy.js';

class Footer extends Component {
	attached() {
		if (isServerSide()) {
			return;
		}
	}

	rendered() {
		this.year = new Date().getFullYear();
	}

};

Soy.register(Footer, templates);

export default Footer;
