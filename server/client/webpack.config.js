const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.scss?$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }
    ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@Components": path.resolve(__dirname, 'src/components/'),
            "@styles": path.resolve(__dirname, 'src/styles/'),
            "@modules": path.resolve(__dirname, 'src/modules'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000, //designates the port to be used
        open: true,
        hot: true,
    },
};