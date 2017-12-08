const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const commonsPlugin = new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'common', /* filename= */'common.js')
module.exports = {
  entry: [
    // 'react-hot-loader/patch',
    // 开启react代码的模块热替换（HMR）
 
    // 'webpack-dev-server/client?http://localhost:10000',
    // 为webpack-dev-server的环境打包好运行代码
    // 然后连接到指定服务器域名与端口
 
    'webpack/hot/only-dev-server',
    // 为热替换（HMR）打包好运行代码
    // only- 意味着只有成功更新运行代码才会执行热替换（HMR）
 
    './src/index.js'
    // 我们app的入口文件
  ],
  // context: path.resolve(__dirname, '/'),
  
  devtool: 'inline-source-map',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    // root: path.resolve(__dirname, 'src'),
    extensions: ['.js', '.json', '.less'],
    alias: {
      //...
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader" },
            { loader: 'postcss-loader' },
            { loader: "less-loader" }
          ],
          publicPath: './build/static/',
        })
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    
    new ExtractTextPlugin('[name].css', { allChunks: true }), // 单独打包CSS
    
    /**
		* HTML文件编译，自动引用JS/CSS
		* 
		* @param filename - 输出文件名，相对路径output.path
		* @param template - HTML模板，相对配置文件目录
		* @param chunks - 只包含指定的文件（打包后输出的JS/CSS）,不指定的话，它会包含生成的所有js和css文件
		* @param excludeChunks - 排除指定的文件（打包后输出的JS/CSS），比如：excludeChunks: ['dev-helper']
		* @param hash
		*/
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // favicon: 'favicon.ico',
      template: './index.html',
      inject: 'body',
    })
  ],
  devServer: {
    hot: true,
    contentBase: '/dist',
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
  }
};