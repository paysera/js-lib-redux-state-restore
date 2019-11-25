import { SAVE, LOAD, REMOVE } from './constants/actionTypes';
import storageWorker from './storage/worker';

const withStorageReducer = ({
    storeName,
    normalizeToStorage,
    normalizeFromStorage,
}) => reducer => (state, action, ...rest) => {
    const { type, payload } = action;
    if (payload && payload.storageConfig && storeName === payload.storageConfig.storeName) {
        if (type === SAVE) {
            const { payload: { storageConfig, identifier } } = action;
            let toSave = state;
            if (typeof normalizeToStorage === 'function') {
                toSave = normalizeToStorage(toSave);
            }

            storageWorker.setItem(storageConfig, identifier, toSave);
        }
        if (type === REMOVE) {
            const { payload: { storageConfig, identifier } } = action;
            storageWorker.removeItem(storageConfig, identifier);
        }
        if (type === LOAD) {
            const { payload: { loadedState } } = action;
            let toLoad = loadedState;
            if (typeof normalizeFromStorage === 'function') {
                toLoad = normalizeFromStorage(state, toLoad);
            }

            return reducer(toLoad, action, ...rest);
        }
    }

    return reducer(state, action, ...rest);
};

export default withStorageReducer;
