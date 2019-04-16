var webpack=require('webpack');
var Ex = require('extract-text-webpack-plugin');

var config={
  entry:{
    'common':['./src/page/common/index.js'],
    'index':['./src/page/index/index.js'],
    'login':['./src/page/login/index.js'],
  },
  output:{
    path:'./dist',
    filename:'js/[name].js'
  },
  externals:{
    'jquery':'window.jQuery'
  },
  plugins: [    
    new webpack.optimize.CommonsChunkPlugin({      
      names:'common',          
      filename:'js/base.js'
    }), 
    new Ex("css/[name].css") 
  ],
  module: {
    loaders: [
      // 编译css并自动添加css前缀
      { 
        test: /\.css$/, 
         loader: Ex.extract('style-loader', 'css-loader')  // 单独打包出CSS，这里配置注意下
      }
    ]
  }
}

module.exports=config;