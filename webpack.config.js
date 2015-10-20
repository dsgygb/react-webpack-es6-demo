var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './app/app.js', // 指定入口文件
    output: {
        path: path.join(__dirname, 'assets/'), // 打包输出的路径
        filename: 'bundle.js', // 输出名称
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel']},
            { test: /\.less$/, loader: "style!css!autoprefixer!less" },
            {test: /\.png$/,loader:"url-loader?limit=10000"}
        ]

    },
    resolve: {
        // 配置后相关文件名的扩展名可以忽略
        extensions: ['','.less','.js', '.jsx', '.json', '.coffee']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        // Webpack压缩代码的时候，React官方提供的代码已经是合并的, 可以通过以下插件优化
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};