const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    output: {
        library: 'PayseraReduxStateRestore',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.worker\.js$/,
                use: [
                    {
                        loader: 'worker-loader',
                        options: {
                            inline: true,
                        },
                    },
                ],
            },
        ],
    },
    devtool: 'source-map',
    context: path.resolve(__dirname, '.'),
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
    },
    target: 'web',
    externals: [nodeExternals()],
};
