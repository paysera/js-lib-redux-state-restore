import { createAction } from 'redux-actions';
import { LOAD } from '../constants/actionTypes';
import reportError from './reportError';
import storageWorker from '../storage/worker';

const loadAction = createAction(LOAD);

const load = storageConfig => identifier => async (dispatch, getState) => {
    let loadedState = getState();
    try {
        loadedState = await storageWorker.getItem(identifier);
    } catch (error) {
        if (storageConfig.errors) {
            dispatch(reportError(storageConfig)(error));
        }
    }

    dispatch(loadAction({ storageConfig, loadedState }));
};

export default load;
