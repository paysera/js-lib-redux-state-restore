import storageWorker from '../storage/worker';
import { REDUX_STATE_RESTORE_NOT_PERSISTED } from '../constants/notPersisted';

const resolveItemIdentifier = storageConfig => async (identifier) => {
    let result = null;
    let availableKeys = [];
    try {
        availableKeys = await storageWorker.keys(storageConfig);
    } catch (error) {
        return null;
    }
    if (identifier && availableKeys.includes(`${identifier}`)) {
        result = `${identifier}`;
    }
    if (result === null && availableKeys.includes(REDUX_STATE_RESTORE_NOT_PERSISTED)) {
        result = REDUX_STATE_RESTORE_NOT_PERSISTED;
    }

    return result;
};

export default resolveItemIdentifier;
