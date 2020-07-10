const path = require("path");

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        index: "./public/scripts/index.js"

    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "build/js")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test:/\.(jpg|png)$/,
                use: ['url-loader?limit=50000']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015','stage-0']
                }

            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    },
};