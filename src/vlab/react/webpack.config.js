const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;
const config = {
    entry:     [  'babel-polyfill',
        'react-hot-loader/patch','./src/index.js', 'whatwg-fetch'],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', {"modules": false}], 'react'],
                        plugins: ['react-hot-loader/babel', 'transform-object-rest-spread']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    externals: {

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'NODE_ENV':JSON.stringify(NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
    ]
};
if (NODE_ENV === 'production') {
    config.output = {
        filename: 'ford-falkerson-bundle.js',
        path: path.resolve(__dirname, '../js/dev/')
    };
    config.plugins.push(
        new webpack.optimize.ModuleConcatenationPlugin()
    );
    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        })
    );
    config.plugins.push(
        new UglifyJsPlugin({ sourceMap: true })
    );
    config.plugins.push(
        new webpack.NoEmitOnErrorsPlugin()
    );
    config.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin()
    );
    config.plugins.push(
        new ExtractTextPlugin('../../css/dev/ford-falkerson-styles.css')
    );
    config.module.rules.push(
        {
            test:  /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
            })
        });

} else {
    config.output = {
        filename: 'ford-falkerson-bundle.js',
        path: path.resolve(__dirname, '../dev/'),
        publicPath: '/'
    };
    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }));
    config.plugins.push(
        new HtmlWebpackPlugin({
            title: 'APP'    ,
            template:'./src/templateDev.html',
            filename:'./index.html',
            inject:false,
            prefix:'',
            source:'http://localhost'
        })
    );
    config. devtool ='inline-source-map';
    config.devServer = {
        historyApiFallback: true,
        contentBase: './index.html',
        hot: true,
        port: 3000,
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
    );
}
module.exports = config;