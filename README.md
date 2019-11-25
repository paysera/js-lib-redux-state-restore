@paysera/redux-state-restore [![Travis CI](https://api.travis-ci.org/paysera/js-lib-redux-state-restore.svg?branch=master)](https://api.travis-ci.org/paysera/js-lib-redux-state-restore.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/paysera/js-lib-redux-state-restore/badge.svg?branch=master)](https://coveralls.io/github/paysera/js-lib-redux-state-restore?branch=master) 
=
Provides tools to persist redux state to local storage and restore it based on specific entity in future user sessions for redux applications.
Library does this by leveraging `localforage` behind a `web-worker` to persist and load state, while higher order reducer and provided react higher order component allows to control the flow.

Installation
-

Require the package `npm i @paysera/redux-state-restore`

Configuration 
-

To differentiate between the branches we have to pass the storage configuration. To make the configuration passing easy we leverage factory functions which ensures that correct reducer ties to specific storage.

This configuration is consisted of object, namely:
```javascript
export default storeConfig = {
    storeName: 'my-redux-branch-storage',
    errors: true,
    normalizeToStorage: ({ addresses, phones }) => ({ addresses, phones }),
    normalizeFromStorage: (state, loadedState) => ({ ...state, ...loadedState }),
};
```

- `storeName` required parameter, initiates local storage under this name and uses it tie actions to specific storage.
- `errors` optional, when turned on will dispatch and action which you can listen for if error occurs when loading state from storage.
- `normalizeToStorage` optional, use when you need to change state before it's saved into storage. For example, want to avoid storing huge images or save only part of the state. Gets state as single argument.
- `normalizeFromStorage` optional, use when you need to modify or patch up part of the state on the current state. Get's redux state as first and state from storage as it's second argument. Always return complete state to ensure state integrity.

<strong>Reducer:</strong>
```javascript
import { combineReducers } from 'redux';
import { createStorageReducer } from '@paysera/redux-state-restore';
import storageConfig from '../storageConfig';

const withStorageReducer = createStorageReducer(storageConfig);

const reducers = {
    foo: withStorageReducer(fooReducer),
    baz: bazReducer,
};

export default combineReducers(reducers);
```

Same goes for our library specific actions and provided HOC:

<strong>Actions:</strong>
```javascript
import { createRemoveAction } from '@paysera/redux-state-restore';
import { createLoadAction } from '@paysera/redux-state-restore';
import { createSaveAction } from '@paysera/redux-state-restore';
import { createReportErrorAction } from '@paysera/redux-state-restore';
import storageConfig from '../storageConfig';

const save = createSaveAction(storageConfig);
const load = createLoadAction(storageConfig);
const remove = createRemoveAction(storageConfig);

// namely, for usage with handleActions function provided by redux-actions library
const reportError = createReportErrorAction(storageConfig);

export {
    save,
    load,
    remove,
    reportError,
};
```

<strong>HOC:</strong>
```javascript
import { withStorageItemIdentifier } from '@paysera/redux-state-restore';
import MyModalComponent from '../MyModalComponent';
import storageConfig from '../storageConfig';

export default withStorageItemIdentifier(storageConfig)(MyModalComponent);
```

<strong>resolveItemIdentifier</strong>
```javascript
import { createItemIdentifierResolver } from '@paysera/redux-state-restore';
import storageConfig from '../storageConfig';

const resolveItemIdentifier = createItemIdentifierResolver(storageConfig);
```

Usage:
-

<strong>Saving:</strong>

Dispatch `saveAction` to save state to storage. Provide identifier as it's payload. Value can be falsy, in this case library will assign one of a kind identifier which is handled automatically by it if you leverage provided HOC.

<strong>Remove: </strong>

Dispatch `removeAction` to remove state from storage. Provide identifier as it's payload. Removes not persisted entity when provided with falsy value.

<strong>Loading:</strong>

Dispatch `loadAction` to load state from storage. Provide identifier as it's payload. Value should not be falsy.

<strong>Higher Order Component:</strong>

While it's possible to leverage all actions provided without provided HOC, it should be a lot easier to do so with it. Especially if you have to differentiate between persisted entities and ones which were never submitted by user.

Wrap your component with it. And provide `identifier` prop which can be `string|number` or falsy value. Like id which can be `null` if it wasn't persisted yet.

```javascript
import { withStorageItemIdentifier } from '@paysera/redux-state-restore';
import MyModalComponent from '../MyModalComponent';
import storageConfig from '../storageConfig';

const StorageRestoreDialogue = withStorageItemIdentifier(storageConfig)(MyModalComponent);

function ExampleParent(props) {
    // ...code
    const { entity: { id } } = props;

    return (
        <StorageRestoreDialogue
            identifier={id}
            {...props}
        />
    );
}
```
The component will only render if something of relevance according to provided identifier was found in storage. It will pass down identifier prop for the item wrapped by it. It's best to dispatch `loadAction` and `removeAction` actions here.

<strong>resolveItemIdentifier:</strong>

Sometimes Higher Order Component may not be sufficient, for example when not using React or for separate  item exits in storage check. When provided with entities identifier, resolver will resolve relating storage item identifier by provided entity's id. Argument can be falsy or `string|number`. Returns a Promise which resolves to `string` if related item exists or `null` if there is none.


<strong>Unit testing</strong>:

Because library uses a web worker, it does not work in node environment as is. You'll have to mock the entire module. 
