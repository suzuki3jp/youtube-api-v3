## [0.4.1](https://github.com/suzuki3jp/youtubes.js/compare/v0.4.0...v0.4.1) (2025-01-19)


### Bug Fixes

* Add missing exports for `PlaylistManager` ([adcf55a](https://github.com/suzuki3jp/youtubes.js/commit/adcf55a8bbce6a00484fa20b2c00b51a72e5010b))

# [0.4.0](https://github.com/suzuki3jp/youtubes.js/compare/v0.3.0...v0.4.0) (2025-01-19)


### Bug Fixes

* Add missing error class and type exports ([6d828ca](https://github.com/suzuki3jp/youtubes.js/commit/6d828ca5734bae7ff1947045924c596b54ba5e11))
* Update copyright year in LICENSE file ([3ce85d1](https://github.com/suzuki3jp/youtubes.js/commit/3ce85d12af4ea99ec5cd9b9e7b86d379c6d5e3de))


### Features

* **PlaylistManager:** Support `playlists.update` endpoint ([8d67df9](https://github.com/suzuki3jp/youtubes.js/commit/8d67df97253760e6bfec9b99e6766fe22cfbd994))

# [0.3.0](https://github.com/suzuki3jp/youtubes.js/compare/v0.2.0...v0.3.0) (2025-01-19)


### Bug Fixes

* **Pagination:** Improve nullish checks for resultsPerPage and totalResults in Pagination class ([aaeae08](https://github.com/suzuki3jp/youtubes.js/commit/aaeae082364668e1d721c1594315eed3851858f0))


### Features

* Implement Result-based error handling ([6e1aaf0](https://github.com/suzuki3jp/youtubes.js/commit/6e1aaf0f15750833ddc273b55519cb2893ef482a))

# [0.2.0](https://github.com/suzuki3jp/youtubes.js/compare/v0.1.2...v0.2.0) (2025-01-18)


### Features

* **ci:** Add API documentation generation to release workflow ([85dd586](https://github.com/suzuki3jp/youtubes.js/commit/85dd586c2ddcd30f3270f16bf5473327b8fc5ffe))

## [0.1.2](https://github.com/suzuki3jp/youtubes.js/compare/v0.1.1...v0.1.2) (2025-01-18)


### Bug Fixes

* Prevent similar package name error ([e175123](https://github.com/suzuki3jp/youtubes.js/commit/e175123f61396376ceb3537c345ef565c14b5fe6))

## [0.1.1](https://github.com/suzuki3jp/youtubes.js/compare/v0.1.0...v0.1.1) (2025-01-18)


### Bug Fixes

* Prevent similar package name error ([fc2ecc4](https://github.com/suzuki3jp/youtubes.js/commit/fc2ecc4daefa8babb717a5ce33c607d01c96dda2))

# [0.1.0](https://github.com/suzuki3jp/youtube.js/compare/v0.0.0...v0.1.0) (2025-01-18)


### Bug Fixes

* Allow falsy values in playlist, thumbnail data validation ([76fec1b](https://github.com/suzuki3jp/youtube.js/commit/76fec1bec84734bfa2c49f422de3a9b2f8fd5af6))
* **tests:** Add missing logger instances in test ([1cc8f6b](https://github.com/suzuki3jp/youtube.js/commit/1cc8f6bcedfa0c82af5cf762fca10a5a62d5b20a))
* **tests:** Update playlist test to use Thumbnails class for thumbnail data ([6c1d6f4](https://github.com/suzuki3jp/youtube.js/commit/6c1d6f4ef8908bf0243c84a169c67a8d4ffdaac0))
* **Thumbnails:** Allow missing standard/maxres thumbnail properties ([64a2c1d](https://github.com/suzuki3jp/youtube.js/commit/64a2c1d2197a83624db660ece16a2fb2561ee7d4))


### Features

* Add some basic classes and `PlaylistManager#getMine` ([e7a6c0e](https://github.com/suzuki3jp/youtube.js/commit/e7a6c0ed380a29ecb3ae39442e3e8b109b942d3e))
* **ApiClient:** Add `logLevel` option ([d26d5b6](https://github.com/suzuki3jp/youtube.js/commit/d26d5b6d4949003ba61fbdaa87ef75f09dfef7b4))
* **Pagination:** Add `Pagination#all` for fetching all pages data ([35afc53](https://github.com/suzuki3jp/youtube.js/commit/35afc53dbfa26f70a1e4ee1b73b2c4a904bb66f8))
* **PlaylistManager:** Add `playlists.delete` support ([73e583a](https://github.com/suzuki3jp/youtube.js/commit/73e583af72b2c2574520b098a12af5479dcba175))
* **PlaylistManager:** Add `playlists.list` full support ([d3e1135](https://github.com/suzuki3jp/youtube.js/commit/d3e1135206fa635c1bf5d174a280936729869efc))
* **PlaylistManager:** Add create method for `playlists.insert` ([c15f1b8](https://github.com/suzuki3jp/youtube.js/commit/c15f1b8de3a63d8fee22e6ac64494d2a5d921c71))
