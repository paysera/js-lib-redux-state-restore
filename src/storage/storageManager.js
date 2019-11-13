import localForage from 'localforage';
import StorageError from '../error/StorageError';

const stores = {};

const setStorage = (storageConfig) => {
    const { storeName } = storageConfig;
    if (stores[storeName]) {
        throw new StorageError(
            `Cant initiate reducer under storage name ${storeName}, storage already exists`,
        );
    }
    stores[storeName] = localForage.createInstance(storageConfig);

    return stores[storeName];
};

const getStorage = (storageConfig) => {
    const { storeName } = storageConfig;
    if (stores[storeName] === undefined) {
        throw new StorageError(
            `Storage under ${storeName} name doesn't exist,
             ensure you use same storage configuration for reducer and related actions`,
        );
    }

    return stores[storeName];
};

export default {
    getStorage,
    setStorage,
};
