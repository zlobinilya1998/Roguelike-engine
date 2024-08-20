const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": path.resolve(__dirname, 'src/'),
            models: path.resolve(__dirname, 'src/models/'),
            game: path.resolve(__dirname, 'src/models/game/'),
            event: path.resolve(__dirname, 'src/models/events/'),
            components: path.resolve(__dirname, 'src/components/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            assets: path.resolve(__dirname, 'src/assets/'),
        },
    },

    mode: 'development',
}