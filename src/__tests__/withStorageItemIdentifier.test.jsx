import React from 'react';
import { mount } from 'enzyme';
import updateComponent from './helpers/updateComponent';

import withStorageItemIdentifier from '../component/withStorageItemIdentifier';
import resolveItemIdentifier from '../service/resolveItemIdentifier';

jest.mock('../service/resolveItemIdentifier');
jest.mock('../storage/worker');

describe('WithStorageItemIdentifier higher order component', () => {
    const WrappedComponent = ({ identifier }) => <h1>{identifier}</h1>; // eslint-disable-line

    test.each([
        [1, 1],
        [null, 0],
    ])('Passes props based on resolved identifier value', async (identifier, expected) => {
        resolveItemIdentifier.mockReturnValue(() => identifier);
        const WithHoc = withStorageItemIdentifier({})(WrappedComponent);
        const TestComponent = mount(<WithHoc />);
        await updateComponent(TestComponent);

        expect(TestComponent.find(WrappedComponent).length).toBe(expected);
    });
});
