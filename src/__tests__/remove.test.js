import remove from '../actions/remove';
import { REMOVE } from '../constants/actionTypes';
import { REDUX_STATE_RESTORE_NOT_PERSISTED } from '../constants/notPersisted';

jest.mock('../storage/worker');
jest.mock('../constants/actionTypes', () => ({
    REMOVE: 'remove',
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
        const configuredSave = remove(storageConfig);
        const dispatch = jest.fn();
        const getState = () => {};
        await configuredSave(identifier)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ type: REMOVE, payload: { storageConfig, identifier: expected } });
    });
});
