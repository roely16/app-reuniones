var webpack = require('webpack');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/apps/app-reuniones/' : '/',
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  devServer: {
    host: 'localhost'
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  }
}
