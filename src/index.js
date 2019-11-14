import withStorageReducer from './withStorageReducer';
import load from './actions/load';
import save from './actions/save';
import remove from './actions/remove';
import reportError from './actions/reportError';
import withStorageItemIdentifier from './component/withStorageItemIdentifier';
import storageWorker from './storage/worker';

const createLoadAction = ({ storeName, errors }) => load({ storeName, errors });
const createSaveAction = ({ storeName }) => save({ storeName });
const createRemoveAction = ({ storeName }) => remove({ storeName });
const createReportErrorAction = ({ storeName }) => reportError({ storeName });
const createStorageReducer = (storageConfig) => {
    storageWorker.initiate({ storeName: storageConfig.storeName });
    return withStorageReducer(storageConfig);
};

export {
    createLoadAction,
    createSaveAction,
    createRemoveAction,
    createReportErrorAction,
    createStorageReducer,
    withStorageItemIdentifier,
};
