'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//添加路由，代码部分，下面还有
const appDataCn = require('../data_Chinese.json');
const sellerCn = appDataCn.seller;
const goodsCn = appDataCn.goods;
const ratingsCn = appDataCn.ratings;
//英文路由
const appDataEn = require('../data_English.json');
const sellerEn = appDataEn.seller;
const goodsEn = appDataEn.goods;
const ratingsEn = appDataEn.ratings;


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before:function(app) {
      app.get('/api/cn/seller', (req, res) => {
        res.json({
          // 访问http://localhost:8080/seller就会返回该json内容，上面这个路径可根据需要随便改
          errno: 0, //错误码，以后根据业务修改
          data: sellerCn
        })
      }),
      app.get('/api/cn/goods', (req, res) => {
        res.json({
          errno: 0,
          data: goodsCn
        })
      }),
      app.get('/api/cn/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: ratingsCn
        })
      })
      app.get('/api/en/seller', (req, res) => {
        res.json({
          // 访问http://localhost:8080/seller就会返回该json内容，上面这个路径可根据需要随便改
          errno: 0, //错误码，以后根据业务修改
          data: sellerEn
        })
      }),
        app.get('/api/en/goods', (req, res) => {
          res.json({
            errno: 0,
            data: goodsEn
          })
        }),
        app.get('/api/en/ratings', (req, res) => {
          res.json({
            errno: 0,
            data: ratingsEn
          })
        })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
