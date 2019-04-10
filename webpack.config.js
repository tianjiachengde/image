//webpack.config.js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry  : './src/components/image-screen-shoot/index.js',             //入口文件
    output : {
        filename : 'imageShoot-tjc.js',     //出口文件名
        path     : path.resolve(__dirname) + '/dist',    //当前目录
        library  : 'imageShoot',      // 打包后模块的名称
        libraryTarget: 'umd'
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    module : {
        rules : [    //定义不同类型的文件使用的loader
            {
                test   : /\.vue$/,
                loader : 'vue-loader'
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader'
            },
            //图片转化，小于8K自动转化为base64的编码
            {
                test: /\.(png|jpg|gif)$/,
                loader:'url-loader?limit=8192'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
        ]
    }
}
