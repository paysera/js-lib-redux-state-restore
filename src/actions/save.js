import { createAction } from 'redux-actions';
import { REDUX_STATE_RESTORE_NOT_PERSISTED } from '../constants/notPersisted';
import { SAVE } from '../constants/actionTypes';

const saveAction = createAction(SAVE);

const save = storageConfig => identifier => dispatch => (
    dispatch(saveAction({ storageConfig, identifier: identifier || REDUX_STATE_RESTORE_NOT_PERSISTED }))
);

export default save;
