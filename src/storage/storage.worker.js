import registerPromiseWorker from 'promise-worker/register';
import storageManager from './storageManager';
import {
    STORAGE_SAVE,
    STORAGE_REMOVE,
    STORAGE_INITIATE,
    STORAGE_KEYS,
    STORAGE_GET,
} from '../constants/workerTasks';

registerPromiseWorker(async (eventMessage) => {
    const {
        storageConfig,
        identifier,
        state,
        type,
    } = eventMessage;
    if (type === STORAGE_INITIATE) {
        storageManager.setStorage(storageConfig);
    }
    if (type === STORAGE_SAVE) {
        const storage = storageManager.getStorage(storageConfig);

        return storage.setItem(identifier, state);
    }
    if (type === STORAGE_REMOVE) {
        const storage = storageManager.getStorage(storageConfig);

        return storage.removeItem(identifier);
    }
    if (type === STORAGE_GET) {
        const storage = storageManager.getStorage(storageConfig);

        return storage.getItem(identifier);
    }
    if (type === STORAGE_KEYS) {
        const storage = storageManager.getStorage(storageConfig);

        return storage.keys();
    }
});
