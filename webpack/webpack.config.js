var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});
module.exports = {
    entry: {
        index: './src/js/index.js',
        goodsInfo: './src/js/goodsInfo.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/out',
        publicPath: 'http://localhost:8080/out'
    },
    module: {
        rules: [
            {test: /.js$/, use: ['babel-loader']},
            // // {test: /.css$/, use: ['style-loader','css-loader']},
            // {
            //     test: /.css$/,
            //     use: ExtractTextPlugin.extract({
            //       fallback: "style-loader",
            //       use: "css-loader"
            //     })
            // },
            {test: /.jpg|png|gif|svg$/, use: ['url-loader?limit=8192&name=./[name].[ext]']}, 
            {test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            minChunks:2}),  
        new ExtractTextPlugin("[name].css"), 
        providePlugin     
    ]
}