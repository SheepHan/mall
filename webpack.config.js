var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig=function(name){
  return {
    template: './src/view/'+name+'.html',
    filename: 'view/'+name+'.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}


//环境变量  dev/online
var  WEB
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
  },
  output: {
    path: './dist',
    publicPath:'/dist',
    filename: 'js/[name].js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  plugins: [
    //获取公共js
    new webpack.optimize.CommonsChunkPlugin({
      names: 'common',
      filename: 'js/base.js'
    }),
    //把css单独打包到文件里
    new Ex("css/[name].css"),
    //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ],
  module: {
    loaders: [
      // 编译css并自动添加css前缀
      {
        test: /\.css$/,
        loader: Ex.extract('style-loader', 'css-loader') // 单独打包出CSS，这里配置注意下
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: Ex.extract('url-loader?limit=100&name=resource/[name].[ext]') // 图片处理
      }
    ]
  }
}

if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;