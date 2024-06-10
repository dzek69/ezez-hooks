All notable changes to this project will be documented in this file.

The format is based on [EZEZ Changelog](https://ezez.dev/guidelines/changelog)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2025-01-11
### Added
- `useMemoizedFn` hook
- `proxyHandlerTransparentGet` helper
- `ProxyRef`, `InputDeviceProviderProps` types export
### Changed
- various docs improvements
### Fixed
- `useGeolocation` `enabled` parameter not honored (always enabled)

## [2.2.0] - 2024-05-13
### Added
- `useProxyRef` hook
- `useForwardedProxyRef` hook

## [2.1.1] - 2024-05-05
### Fixed
- `useBusy` causing uncaught promise rejection

## [2.1.0] - 2024-03-03
### Added
- `useDepEffect` alias for `useEffect2`
### Fixed
- missing dependency: `@ezez/utils`

## [2.0.0] - 2023-12-30
### Breaking
- `useEffect2` will trigger the callback whenever the dependency array size change, this is different from `useEffect`,
but more intuitive
### Fixed
- `useConditionalHooks` will correctly update the result when called hook returns an array

## [1.2.2] - 2023-09-11
### Fixed
- SSR when using `useCrossTabs`

## [1.2.1] - 2023-08-26
### Fixed
- missing exports of hooks from 1.2.0

## [1.2.0] - 2023-08-26
### Added
- `useCrossTabs` hook
- `useCrossTabsMessage` hook
- `useDetectMultiTabs` hook
- `useEffect2` hook
- `useIsFirstRender` hook
### Dev
- upgraded ts-library-template (yarn -> pnpm, deps, support for paths, etc.)
- fixed demos not running
- fixed react and react-dom being in dependencies

## [1.1.3] - 2023-07-03
### Fixed
- `useGeolocation` causing blinking GPS icon on mobile

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
