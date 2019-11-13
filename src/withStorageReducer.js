import { get, update } from 'lodash/object';
import { debounce } from 'lodash/function';
import { SAVE, LOAD, REMOVE } from './constants/actionTypes';
import storageWorker from './storage/worker';

const setItemWithDebounce = debounce(storageWorker.setItem, 500);

const withStorageReducer = ({ storeName, path }) => reducer => (state, action, ...rest) => {
    const { type, payload } = action;
    if (!payload || !payload.storageConfig || storeName !== payload.storageConfig.storeName) {
        return reducer(state, action, ...rest);
    }
    if (type === SAVE) {
        const { payload: { storageConfig, identifier } } = action;
        let toSave = state;
        if (typeof path === 'string') {
            toSave = get(state, path);
        }

        setItemWithDebounce(storageConfig, identifier, toSave);

        return reducer(state, action, ...rest);
    }
    if (type === REMOVE) {
        const { payload: { storageConfig, identifier } } = action;
        storageWorker.removeItem(storageConfig, identifier);

        return reducer(state, action, ...rest);
    }
    if (type === LOAD) {
        const { payload: { loadedState } } = action;

        return path
            ? reducer(update({ ...state }, path, () => loadedState), action, ...rest)
            : reducer(loadedState, action, ...rest);
    }

    return reducer(state, action, ...rest);
};

export default withStorageReducer;
