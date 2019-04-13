const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: ['./sass/app.sass']
    },
    output:{
        path: path.resolve('./'),
        filename: './assets/js/app.js'
//        libraryTarget: "umd"
    },
    module:{
        rules:[
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options:{
                    presets: ['env','es2015']
                }
            }, 
            {
                test : /\.(scss|sass)$/,
               //use: ['style-loader', 'css-loader', 'sass-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'resolve-url-loader']
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename:"./assets/css/app.css",
            disable: false,
            allChunks: true
        })
    ]
}