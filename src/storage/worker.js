import PromiseWorker from 'promise-worker';
import StorageWorker from './storage.worker';
import {
    STORAGE_REMOVE,
    STORAGE_SAVE,
    STORAGE_INITIATE,
    STORAGE_GET,
    STORAGE_KEYS,
} from '../constants/workerTasks';

const worker = new PromiseWorker(new StorageWorker());

const initiate = storageConfig => worker.postMessage({
    storageConfig,
    type: STORAGE_INITIATE,
});

const setItem = (storageConfig, identifier, state) => worker.postMessage({
    storageConfig,
    identifier,
    state,
    type: STORAGE_SAVE,
});

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
