import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const { error } = console;
console.error = (warning, ...args) => {
    if (/(Invalid prop|Failed prop type)/gi.test(warning)) {
        throw new Error(warning);
    }
    error.apply(console, [warning, ...args]);
};
