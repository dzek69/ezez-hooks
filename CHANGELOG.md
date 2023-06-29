All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [UNRELEASED]
(nothing yet)

## [1.1.2] - 2023-06-29
### Fixed
- missing an explicit return type for `useSimpleGeolocation`

## [1.1.1] - 2023-06-29
### Fixed
- missing `useSimpleGeolocation` export

## [1.1.0] - 2023-06-29
### Added
- `useGeolocation` hook
- `useSimpleGeolocation` hook
- `useForceUpdate` hook
### Changed
- set an explicit return type wherever possible
- slight docs updates/rewording
### Dev
- dev deps update

## [1.0.0] - 2023-06-08
### Added
- `useInputDevice` hook
- `useUpdateEvery` hook

## [0.2.0] - 2023-06-07
### Added
- `useToday` hook
### Changed
- `useConditionalHooks` is now documented

## [0.1.0] - 2023-06-06
### Breaking
- useConditionalHooks now accepts object of hooks instead of array
- useConditionalHooks now returns object of results instead of array
### Changed
- useConditionalHooks now accepts changeDetector which helps with performance and optionally prevents infinite loops
- useConditionalHooks now exposes createConditionalHook helper for nicer code and better types
### Added
- useBusy hook
### Fixed
- useConditionalHooks now correctly adds `null` to possible return values

## [0.0.3] - 2023-06-05
### Changed
- improved support for hooks returning objects

## [0.0.2] - 2023-06-04
### Fixed
- broken import

## [0.0.1] - 2023-06-04
### Added
- useConditionalHooks beta
