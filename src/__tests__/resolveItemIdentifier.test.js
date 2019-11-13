import resolveItemIdentifier from '../service/resolveItemIdentifier';
import storageWorker from '../storage/worker';
import { REDUX_STATE_RESTORE_NOT_PERSISTED } from '../constants/notPersisted';

jest.mock('../storage/worker');

describe('resolveItemIdentifier service', () => {
    test.each([
        [
            1,
            [1, 2, REDUX_STATE_RESTORE_NOT_PERSISTED],
            1,
        ],
        [
            1,
            [2, 3, REDUX_STATE_RESTORE_NOT_PERSISTED],
            REDUX_STATE_RESTORE_NOT_PERSISTED,
        ],
        [
            null,
            [1, 2, REDUX_STATE_RESTORE_NOT_PERSISTED],
            REDUX_STATE_RESTORE_NOT_PERSISTED,
        ],
        [
            null,
            [1, 2],
            null,
        ],
    ])('Resolves identifier based on storage values', async (identifier, keys, expected) => {
        const keysMock = jest.fn();
        keysMock.mockReturnValue(keys);
        storageWorker.keys = keysMock;

        const result = await resolveItemIdentifier({})(identifier);
        expect(result).toStrictEqual(expected);
    });

    test('Resolves identifier to null on storage error', async () => {
        const keysMock = jest.fn();
        keysMock.mockImplementation(() => { throw new Error(); });
        storageWorker.keys = keysMock;

        const result = await resolveItemIdentifier({})(1);
        expect(result).toStrictEqual(null);
    });
});
