import { get, update } from 'lodash/object';
import { SAVE, LOAD, REMOVE } from './constants/actionTypes';
import storageWorker from './storage/worker';

const withStorageReducer = ({ storeName, path }) => reducer => (state, action, ...rest) => {
    const { type, payload } = action;
    if (payload && payload.storageConfig && storeName === payload.storageConfig.storeName) {
        if (type === SAVE) {
            const { payload: { storageConfig, identifier } } = action;
            let toSave = state;
            if (typeof path === 'string') {
                toSave = get(state, path);
            }

            storageWorker.setItem(storageConfig, identifier, toSave);
        }
        if (type === REMOVE) {
            const { payload: { storageConfig, identifier } } = action;
            storageWorker.removeItem(storageConfig, identifier);
        }
        if (type === LOAD) {
            const { payload: { loadedState } } = action;

            return path
                ? reducer(update({ ...state }, path, () => loadedState), action, ...rest)
                : reducer(loadedState, action, ...rest);
        }
    }

    return reducer(state, action, ...rest);
};

export default withStorageReducer;
