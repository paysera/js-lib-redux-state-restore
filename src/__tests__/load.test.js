import load from '../actions/load';
import storageWorker from '../storage/worker';
import { LOAD } from '../constants/actionTypes';

jest.mock('../storage/worker');
jest.mock('../constants/actionTypes', () => ({
    LOAD: 'load',
    REPORT_ERROR: 'report_error',
}));

describe('Load action', () => {
    afterEach(() => {
        storageWorker.getItem.mockClear();
    });

    test('Loads from storageWorker based on identifier', async () => {
        const loadedState = 'storage_state';
        storageWorker.getItem.mockReturnValue(loadedState);
        const storageConfig = { storeName: 'name' };
        const configuredLoad = load(storageConfig);
        const dispatch = jest.fn();
        const getState = () => {};
        await configuredLoad(1)(dispatch, getState);

        expect(storageWorker.getItem).toHaveBeenCalledWith(storageConfig, 1);
        expect(dispatch).toHaveBeenCalledWith({ type: LOAD, payload: { storageConfig, loadedState } });
    });

    test('Returns original state on storage error', async () => {
        const error = new Error();
        storageWorker.getItem.mockImplementation(() => { throw error; });
        const storageConfig = { storeName: 'name', errors: true };
        const configuredLoad = load(storageConfig);
        const dispatch = jest.fn();
        const state = {};
        const getState = () => state;
        await configuredLoad(1)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);
    });
});
