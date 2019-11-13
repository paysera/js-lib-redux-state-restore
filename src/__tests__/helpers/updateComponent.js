import { act } from 'react-dom/test-utils';

const updateComponent = async (wrapper) => {
    await act(async () => {
        await (new Promise(resolve => setTimeout(resolve, 0)));
        wrapper.update();
    });
};

export default updateComponent;
