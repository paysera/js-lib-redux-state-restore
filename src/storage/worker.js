import PromiseWorker from 'promise-worker';
import { debounce } from 'lodash/function';
import StorageWorker from './storage.worker';
import {
    STORAGE_REMOVE,
    STORAGE_SAVE,
    STORAGE_INITIATE,
    STORAGE_GET,
    STORAGE_KEYS,
} from '../constants/workerTasks';

const worker = new PromiseWorker(new StorageWorker());

const debouncedSetItems = {};

const storeItem = ({ storeName }, identifier, state) => worker.postMessage({
    storageConfig: { storeName },
    identifier,
    state,
    type: STORAGE_SAVE,
});

const initiate = ({ storeName }) => {
    debouncedSetItems[storeName] = debounce(storeItem, 500);
    worker.postMessage({
        storageConfig: { storeName },
        type: STORAGE_INITIATE,
    });
};

const setItem = ({ storeName }, identifier, state) => {
    debouncedSetItems[storeName]({ storeName }, identifier, state);
};

const removeItem = ({ storeName }, identifier) => worker.postMessage({
    storageConfig: { storeName },
    identifier,
    type: STORAGE_REMOVE,
});

const keys = ({ storeName }) => worker.postMessage({
    storageConfig: { storeName },
    type: STORAGE_KEYS,
});

const getItem = ({ storeName }, identifier) => worker.postMessage({
    storageConfig: { storeName },
    identifier,
    type: STORAGE_GET,
});

export default {
    setItem,
    removeItem,
    initiate,
    getItem,
    keys,
};
