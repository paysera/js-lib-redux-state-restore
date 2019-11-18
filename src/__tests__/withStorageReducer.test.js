import withStorageReducer from '../withStorageReducer';
import { SAVE, LOAD, REMOVE } from '../constants/actionTypes';
import storageWorker from '../storage/worker';

jest.mock('../constants/actionTypes', () => ({
    SAVE: 'save',
    LOAD: 'load',
    REMOVE: 'remove',
}));
jest.mock('../storage/worker');

describe('withStorageReducer function', () => {
    afterEach(() => {
        storageWorker.setItem.mockClear();
        storageWorker.removeItem.mockClear();
    });

    test.each([
        [{ type: SAVE, payload: { storageConfig: { storeName: 'some_other_store' } } }],
        [{ type: 'some_other_action', payload: { storageConfig: { storeName: 'test_store' } } }],
        [{ type: REMOVE }],
        [{ type: LOAD, payload: { identifier: 145 } }],
    ])('withStorageReducer returns original reducer when action or storeName does not match', (action) => {
        const reducer = withStorageReducer({ storeName: 'test_store' })(state => state);
        const state = { one: 1, two: 2 };
        const result = reducer(state, action);

        expect(storageWorker.setItem).toHaveBeenCalledTimes(0);
        expect(storageWorker.removeItem).toHaveBeenCalledTimes(0);
        expect(state).toStrictEqual(result);
    });

    test('Calls setItem on state based on action correctly', () => {
        const storageConfig = { storeName: 'test_store' };
        const reducer = withStorageReducer(storageConfig)(state => state);
        const state = { one: 1, two: 2 };
        reducer(state, { type: SAVE, payload: { storageConfig, identifier: 1 } });

        expect(storageWorker.removeItem).toHaveBeenCalledTimes(0);
        expect(storageWorker.setItem).toHaveBeenCalledWith(storageConfig, 1, state);
    });

    test('Calls setItem on part of the state based on action and provided path', () => {
        const storageConfig = { storeName: 'test_store', path: 'two' };
        const reducer = withStorageReducer(storageConfig)(state => state);
        const state = { one: 1, two: 2 };
        const result = reducer(state, { type: SAVE, payload: { storageConfig, identifier: 1 } });

        expect(storageWorker.removeItem).toHaveBeenCalledTimes(0);
        expect(storageWorker.setItem).toHaveBeenCalledWith(storageConfig, 1, 2);
        expect(state).toStrictEqual(result);
    });

    test('Calls removeItem based on action', () => {
        const storageConfig = { storeName: 'test_store', path: 'two' };
        const reducer = withStorageReducer(storageConfig)(state => state);
        const state = { one: 1, two: 2 };
        const result = reducer(state, { type: REMOVE, payload: { storageConfig, identifier: 1 } });

        expect(storageWorker.setItem).toHaveBeenCalledTimes(0);
        expect(storageWorker.removeItem).toHaveBeenCalledWith(storageConfig, 1);
        expect(state).toStrictEqual(result);
    });

    test('Loads state based on action', () => {
        const storageConfig = { storeName: 'test_store' };
        const reducer = withStorageReducer(storageConfig)(state => state);
        const state = { one: 1, two: 2 };
        const loadedState = { one: 3, two: 4 };
        const result = reducer(state, { type: LOAD, payload: { storageConfig, loadedState } });

        expect(storageWorker.removeItem).toHaveBeenCalledTimes(0);
        expect(storageWorker.setItem).toHaveBeenCalledTimes(0);
        expect(result).toStrictEqual(loadedState);
    });

    test('Load state based on action and update according to provided path', () => {
        const storageConfig = { storeName: 'test_store', path: 'three.europe.spain' };
        const reducer = withStorageReducer(storageConfig)(state => state);
        const state = {
            one: 1,
            two: 2,
            three: {
                europe: {
                    spain: [
                        'Madrid',
                        'Grenada',
                    ],
                    poland: [
                        'Warsaw',
                        'Wroclaw',
                    ],
                },
                africa: {},
                asia: {},
            },
        };
        const loadedState = ['Leon', 'Valencia'];
        const result = reducer(state, { type: LOAD, payload: { storageConfig, loadedState } });
        const expected = {
            ...state,
            three: {
                ...state.three,
                europe: {
                    ...state.three.europe,
                    spain: loadedState,
                },
            },
        };

        expect(storageWorker.removeItem).toHaveBeenCalledTimes(0);
        expect(storageWorker.setItem).toHaveBeenCalledTimes(0);
        expect(result).toStrictEqual(expected);
        expect(state !== result).toBe(true);
    });
});
