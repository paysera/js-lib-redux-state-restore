module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    roots: ['src/'],
    collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
    testRegex: '(/__tests__/.*\\.test)\\.jsx?$',
    setupFiles: [
        './jest.setup.js',
    ],
};
