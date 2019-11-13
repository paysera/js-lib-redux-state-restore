import save from '../actions/save';
import { SAVE } from '../constants/actionTypes';
import { REDUX_STATE_RESTORE_NOT_PERSISTED } from '../constants/notPersisted';

jest.mock('../storage/worker');
jest.mock('../constants/actionTypes', () => ({
    SAVE: 'save',
}));
jest.mock('../constants/notPersisted', () => ({
    REDUX_STATE_RESTORE_NOT_PERSISTED: 'persisted',
}));

describe('Save action test', () => {
    test.each([
        [1, 1],
        [0, REDUX_STATE_RESTORE_NOT_PERSISTED],
        [null, REDUX_STATE_RESTORE_NOT_PERSISTED],
    ])('Resolves payload and dispatches save action', async (identifier, expected) => {
        const storageConfig = { storeName: 'name' };
        const configuredSave = save(storageConfig);
        const dispatch = jest.fn();
        const getState = () => {};
        await configuredSave(identifier)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ type: SAVE, payload: { storageConfig, identifier: expected } });
    });
});
