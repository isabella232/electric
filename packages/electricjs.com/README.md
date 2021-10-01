<!--
SPDX-FileCopyrightText: © 2017 Liferay International Ltd. <https://liferay.com>

SPDX-License-Identifier: BSD-3-Clause
-->

# [electricjs.com](http://electricjs.com) [![Built with Electric](https://img.shields.io/badge/built%20with-electric-f3c302.svg?style=flat)](http://electricjs.com)

> If you're looking for the source code of our static site generator, check the [electric](https://github.com/wedeploy/electric) repository.

## Setup

1. Make sure you have [node and npm](https://nodejs.org/en/download/) installed:

```sh
node -v && npm -v
```

2. Install our global dependencies:

```sh
[sudo] npm i -g electric-cli@alpha
```

3. Install our local dependencies:

```sh
npm i
```

## Usage

* Build the site, serve it locally, and watch for any changes:

```
electric run
```

* Deploy to production (send build files to `wedeploy` branch):

```
electric deploy
```

## License

[BSD License](https://github.com/wedeploy/electricjs.com/blob/master/LICENSE.md) © Liferay, Inc.
