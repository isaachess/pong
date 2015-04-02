var webpack = require('webpack');
var bower_dir = __dirname + '/bower_components';

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    entry: {
        app: ['./app/main.js'],
    },
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    resolve: { alias: {} },
    module: {
        noParse: [],
        preLoaders: [
            {
                test: /\.jsx?$/, // include .js files
                exclude: [/node_modules/, /bower_components/], // exclude any and all files in the node_modules folder
                loader: "jsxhint-loader"
            }
        ],
        loaders: [
            { test: /\.jsx?$/, loader: 'jsx-loader' },
            { test: /\.jsx?$/, exclude: [/node_modules/, /bower_components/], loader: '6to5-loader?experimental=true'},
            { test: /\.less$/, loader: "style!css!less" },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            to5Runtime: "imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime"
        })
    ],
    jshint: {
        "esnext": true,
        "undef": true,
        "unused": true,
        "browser": true,
        "devel": true
    }
};

config.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = config;
