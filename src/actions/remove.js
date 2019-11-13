import { createAction } from 'redux-actions';
import { REMOVE } from '../constants/actionTypes';

const removeAction = createAction(REMOVE);

const remove = storageConfig => identifier => dispatch => dispatch(removeAction({ storageConfig, identifier }));

export default remove;
