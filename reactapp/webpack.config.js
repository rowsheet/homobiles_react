const path = require('path');

module.exports = {
    entry: {
        scripts: [
            './src/index.js',
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../homobiles/static/dist'),
        publicPath: '/static/dist/',
        libraryTarget: 'var',
        library: 'Homobiles',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/transform-runtime"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
                node_modules: __dirname + '/node_modules'
        }
    },
};
