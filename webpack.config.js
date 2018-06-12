var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
    'dist',
]
module.exports = {
    entry: {
        "app.bundle": './src/app.js',
        // 这行是新增的。
        "contact": './src/contact.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js'
    },
    plugins: [    
        new HtmlWebpackPlugin({
        title:'a title',
        template: './src/index.html',
        filename: 'index.html',
        minify: {
          collapseWhitespace: true,
        },
        hash: true,
        // 这行是新增的。
        excludeChunks: ['contact']
      }),
      new HtmlWebpackPlugin({
        template: './src/contact.html',
        filename: 'contact.html',
        minify: {
          collapseWhitespace: true,
        },
        hash: true,
        // 这行是新增的。
        chunks: ['contact']
      }),
        new CleanWebpackPlugin(pathsToClean),
        new ExtractTextPlugin('style.css'),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            // 这两行是处理 react 相关的内容
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};