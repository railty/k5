var webpack = require('webpack');

module.exports = {
  entry: {
    index: './www/js/index.jsx',
    vendor: [
      'react',
      'alt',
      'alt-connect',
      'axios',
      'debug',
      'bluebird',
      'react-dnd',
      'react-dnd-touch-backend',
      'react-dnd-html5-backend',
    ]
  },
  output: {
    path: __dirname + '/www/js/',
    filename: '[name].js',
    publicPath: '/www/js/'
  },
  resolve: {
    extensions: ['', '.json', '.node', '.js', '.jsx'],
    alias: {
        jquery: __dirname + "/bower_components/jquery/dist/jquery.js",
    },
    modulesDirectories: ['node_modules', "www/js"]
  },
  plugins: [
      new webpack.ProvidePlugin({Promise: 'bluebird'}),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor/index.js', ['index']),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel?stage=0'],
      exclude: /(node_modules|bower_components)/
    },{
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both style and css loaders
    },{
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      loader: 'url-loader'
    },{
      test: /\.less$/,
      loader: "style!css!less"
    }
  ]}
};
