[![Build Status][travis-badge]][travis-url]
[![Code Climate][code-badge]][code-url]
[![Test Coverage][cover-badge]][code-url]

[![NPM version][npm-badge]][npm-url]
[![NPM downloads][npm-downloads-badge]][npm-url]
[![Types][types-badge]][npm-url]
[![Donate][donate-badge]][donate-url]

[![Dependencies][dep-badge]][dep-url]
[![Dev Dependencies][dev-dep-badge]][dev-dep-url]
[![Dependents][deps-badge]][npm-url]

[code-badge]: https://codeclimate.com/github/iccicci/owen-s-t-function/badges/gpa.svg
[code-url]: https://codeclimate.com/github/iccicci/owen-s-t-function
[cover-badge]: https://codeclimate.com/github/iccicci/owen-s-t-function/badges/coverage.svg
[dep-badge]: https://david-dm.org/iccicci/owen-s-t-function.svg
[dep-url]: https://david-dm.org/iccicci/owen-s-t-function
[deps-badge]: https://badgen.net/npm/dependents/owen-s-t-function?icon=npm
[dev-dep-badge]: https://david-dm.org/iccicci/owen-s-t-function/dev-status.svg
[dev-dep-url]: https://david-dm.org/iccicci/owen-s-t-function?type=dev
[donate-badge]: https://badgen.net/badge/donate/bitcoin?icon=bitcoin
[donate-url]: https://blockchain.info/address/12p1p5q7sK75tPyuesZmssiMYr4TKzpSCN
[npm-downloads-badge]: https://badgen.net/npm/dm/owen-s-t-function?icon=npm
[npm-badge]: https://badgen.net/npm/v/owen-s-t-function?color=green&icon=npm
[npm-url]: https://www.npmjs.com/package/owen-s-t-function
[travis-badge]: https://badgen.net/travis/iccicci/owen-s-t-function?icon=travis
[travis-url]: https://travis-ci.org/iccicci/owen-s-t-function?branch=master
[types-badge]: https://badgen.net/npm/types/owen-s-t-function?color=green&icon=typescript

# owen-s-t-function

Approximate [Owen's T function](https://en.wikipedia.org/wiki/Owen%27s_T_function) implementation.

**C++** to **JavaScript** _translation_ from [OWENS library](http://people.math.sc.edu/Burkardt/cpp_src/owens/owens.html).

### Usage

```javascript
import { T } from "./owen-s-t-function";

console.log(T(1, 2));
```

### Installation

With [npm](https://www.npmjs.com/package/owen-s-t-function):

```sh
$ npm install --save rotating-file-stream
```

### Testing

Unit test:

```sh
$ npm test
```

Test coverage:

```sh
$ npm run coverage
```

Visual test:

```sh
$ npm start
```
