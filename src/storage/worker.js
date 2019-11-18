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

const storeItem = (storageConfig, identifier, state) => worker.postMessage({
    storageConfig,
    identifier,
    state,
    type: STORAGE_SAVE,
});

const initiate = (storageConfig) => {
    debouncedSetItems[storageConfig.storeName] = debounce(storeItem, 500);
    worker.postMessage({
        storageConfig,
        type: STORAGE_INITIATE,
    });
};

const setItem = (storageConfig, identifier, state) => {
    debouncedSetItems[storageConfig.storeName](storageConfig, identifier, state);
};

const removeItem = (storageConfig, identifier) => worker.postMessage({
    storageConfig,
    identifier,
    type: STORAGE_REMOVE,
});

const keys = storageConfig => worker.postMessage({
    storageConfig,
    type: STORAGE_KEYS,
});

const getItem = (storageConfig, identifier) => worker.postMessage({
    storageConfig,
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
