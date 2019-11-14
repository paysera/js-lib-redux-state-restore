import { createAction } from 'redux-actions';
import { LOAD } from '../constants/actionTypes';
import reportError from './reportError';
import storageWorker from '../storage/worker';

const loadAction = createAction(LOAD);

const load = storageConfig => identifier => async (dispatch) => {
    try {
        const loadedState = await storageWorker.getItem(storageConfig, identifier);
        dispatch(loadAction({ storageConfig, loadedState }));
    } catch (error) {
        if (storageConfig.errors) {
            dispatch(reportError(storageConfig)(error));
        }
    }
};

export default load;
