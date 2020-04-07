const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '_': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, './src/components'),
            $act: path.resolve(__dirname, './src/actions'),
            $reduce: path.resolve(__dirname, './src/reducers'),
            $type: path.resolve(__dirname, './src/custom-types'),
            $const: path.resolve(__dirname, './src/constants'),
            
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },														
                            sourceMap: true
                        }
                     },
                     { 
                         loader: 'postcss-loader',
                         options: {
                             ident: 'postcss',
                             plugins: () => [
                                 autoprefixer({})
                             ]
                         }
                      }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=10000&name=img/[name].[ext]'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                }
            },
            {
                test: /\.(woff2?)(\?.*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/octet-stream'
                }
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};