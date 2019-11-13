import { createAction } from 'redux-actions';
import { REPORT_ERROR } from '../constants/actionTypes';

const reportErrorAction = createAction(REPORT_ERROR);

const reportError = storageConfig => error => dispatch => dispatch(reportErrorAction({ storageConfig, error }));

export default reportError;
