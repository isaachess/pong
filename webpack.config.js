var bower_dir = __dirname + '/bower_components';

module.exports = {
    entry: ['./app/main.js'],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'react': bower_dir + '/react/react.min.js'
        }
    },
    module: {
        noParse: [bower_dir + '/react/react.min.js'],
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' },
            { test: /\.js$/, loader: 'jsx-loader' }
        ]
    }
};
