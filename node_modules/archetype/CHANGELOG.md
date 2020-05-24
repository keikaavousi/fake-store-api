<a name="0.11.3"></a>
## [0.11.3](https://github.com/boosterfuels/archetype/compare/v0.11.2...v0.11.3) (2020-05-18)


### Bug Fixes

* **import:** Remove unused import of index.js in src/unmarshal/index.js ([71eac99](https://github.com/boosterfuels/archetype/commit/71eac99))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/boosterfuels/archetype/compare/v0.11.0...v0.11.1) (2020-02-27)


### Bug Fixes

* throw non-empty object $default error if passing in a date or other non-POJO ([76e7bfa](https://github.com/boosterfuels/archetype/commit/76e7bfa))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/boosterfuels/archetype/compare/v0.10.2...v0.11.0) (2020-02-27)


### Features

* make `new Type()` clone by default, but allow passing in an option to disable cloning for perf ([3638b57](https://github.com/boosterfuels/archetype/commit/3638b57))



<a name="0.10.2"></a>
## [0.10.2](https://github.com/boosterfuels/archetype/compare/v0.10.0...v0.10.2) (2020-02-25)


### Bug Fixes

* clone empty arrays / objects if set as `$default`, throw if not an empty object ([312aa14](https://github.com/boosterfuels/archetype/commit/312aa14))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/boosterfuels/archetype/compare/v0.10.0...v0.10.1) (2020-02-25)


### Bug Fixes

* clone empty arrays / objects if set as `$default`, throw if not an empty object ([312aa14](https://github.com/boosterfuels/archetype/commit/312aa14))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/boosterfuels/archetype/compare/v0.9.1...v0.10.0) (2019-08-09)


### Performance Improvements

* remove `cloneDeep()` to reduce memory usage for huge objects ([117c083](https://github.com/boosterfuels/archetype/commit/117c083))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/boosterfuels/archetype/compare/v0.9.0...v0.9.1) (2019-06-10)


### Bug Fixes

* export core Type class ([3e1bdf2](https://github.com/boosterfuels/archetype/commit/3e1bdf2))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/boosterfuels/archetype/compare/v0.8.8...v0.9.0) (2019-02-12)


### Bug Fixes

* ignore special properties ([7b99d33](https://github.com/boosterfuels/archetype/commit/7b99d33))
* **to:** disallow casting POJOs to numbers ([5548fc2](https://github.com/boosterfuels/archetype/commit/5548fc2))


### Features

* make `compile()` return a full ES6 class for improved inheritance ([d3e873e](https://github.com/boosterfuels/archetype/commit/d3e873e)), closes [#9](https://github.com/boosterfuels/archetype/issues/9)



<a name="0.8.8"></a>
## [0.8.8](https://github.com/boosterfuels/archetype/compare/v0.8.7...v0.8.8) (2019-01-30)


### Bug Fixes

* remove leftover reference to lodash ([34c6519](https://github.com/boosterfuels/archetype/commit/34c6519))



<a name="0.8.7"></a>
## [0.8.7](https://github.com/boosterfuels/archetype/compare/v0.8.6...v0.8.7) (2019-01-29)


### Bug Fixes

* clean up unnecessary _.each() usage ([ab32c15](https://github.com/boosterfuels/archetype/commit/ab32c15))



<a name="0.8.6"></a>
## [0.8.6](https://github.com/boosterfuels/archetype/compare/v0.8.5...v0.8.6) (2019-01-28)



<a name="0.8.4"></a>
## [0.8.4](https://github.com/boosterfuels/archetype/compare/v0.8.3...v0.8.4) (2019-01-27)


### Bug Fixes

* **defaults:** handle nested defaults correctly ([c02b89b](https://github.com/boosterfuels/archetype/commit/c02b89b)), closes [#16](https://github.com/boosterfuels/archetype/issues/16)
* **to:** dont convert null -> undefined when casting strings ([92faef2](https://github.com/boosterfuels/archetype/commit/92faef2))



<a name="0.8.3"></a>
## [0.8.3](https://github.com/boosterfuels/archetype/compare/v0.8.2...v0.8.3) (2018-03-21)


### Features

* support inPlace updates for recursive schemas ([8f61d32](https://github.com/boosterfuels/archetype/commit/8f61d32)), closes [#11](https://github.com/boosterfuels/archetype/issues/11)



<a name="0.8.2"></a>
## [0.8.2](https://github.com/boosterfuels/archetype/compare/v0.8.1...v0.8.2) (2017-12-03)


### Bug Fixes

* **unmarshal:** don't use $transform on array if nested in child element ([78bc272](https://github.com/boosterfuels/archetype/commit/78bc272)), closes [#13](https://github.com/boosterfuels/archetype/issues/13)



<a name="0.8.1"></a>
## [0.8.1](https://github.com/boosterfuels/archetype/compare/v0.8.0...v0.8.1) (2017-10-19)


### Bug Fixes

* handle passing array of paths to `Type.omit()` ([0cfc96f](https://github.com/boosterfuels/archetype/commit/0cfc96f))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/boosterfuels/archetype/compare/v0.7.0...v0.8.0) (2017-09-21)


### Features

* export CastError type ([1c3a971](https://github.com/boosterfuels/archetype/commit/1c3a971)), closes [#7](https://github.com/boosterfuels/archetype/issues/7)
* **helpers:** add matchType ([7f5e1e8](https://github.com/boosterfuels/archetype/commit/7f5e1e8))
* **unmarshal:** add rudimentary support for $transform ([8bdf8db](https://github.com/boosterfuels/archetype/commit/8bdf8db))
* **unmarshal:** report errors from $transform ([a8c9e3d](https://github.com/boosterfuels/archetype/commit/a8c9e3d))
* **unmarshal:** support $transform in arrays ([2d11cf5](https://github.com/boosterfuels/archetype/commit/2d11cf5))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/vkarpov15/archetype-js/compare/v0.6.0...v0.6.1) (2017-03-17)


### Bug Fixes

* **unmarshal:** handle $type: Array with non-arrays ([f65c063](https://github.com/vkarpov15/archetype-js/commit/f65c063))




