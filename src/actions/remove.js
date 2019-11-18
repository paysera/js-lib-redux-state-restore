import { createAction } from 'redux-actions';
import { REMOVE } from '../constants/actionTypes';
import { REDUX_STATE_RESTORE_NOT_PERSISTED } from '../constants/notPersisted';

const removeAction = createAction(REMOVE);

const remove = storageConfig => identifier => dispatch => (
    dispatch(removeAction({ storageConfig, identifier: identifier || REDUX_STATE_RESTORE_NOT_PERSISTED }))
);

export default remove;
