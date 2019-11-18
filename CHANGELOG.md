## [0.0.8] - 2019-11-18
### Changed
- Auto resolves not persisted identifier on remove action from falsy value.

## [0.0.7] - 2019-11-18
### Changed
- Separated debounce for setItem function for each specific store.

## [0.0.5] - 2019-11-14
### Added
- Identifiers are serialized to strings before making calls to localforage

## [0.0.4] - 2019-11-14
### Changed
- package.json fix

## [0.0.3] - 2019-11-14
### Changed
- Load action is not dispatched by thunk if retrieval from storage failed.
- Storage initiation via worker does not return anything.

## [0.0.2] - 2019-11-13 
### Changed
- Code style fixes to `withStorageReducer`
