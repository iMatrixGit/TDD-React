module.exports = {
    entry: './src/scripts/main.js',
    output: {
        path: __dirname + '/build',
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    devServer: { inline: true },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};