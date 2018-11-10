const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');


const devServer = {
  disableHostCheck: true,
  historyApiFallback: true,
  hot: true,
  https: true,
  port: 9000,
  watchOptions: {
    poll: true
  }
};

function getValue(obj, key) {
  return obj && obj[key];
}

var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (Options) => {
  const isProd = getValue(Options, 'prod');

  const config = {};

  // The context is an absolute string to the directory that contains the entry files.
  config.context = path.resolve(__dirname, 'src');

  config.resolve = {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css']
  };

  config.entry = {
    main: './index.tsx'
  };

  config.output = {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  };

  config.module = {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },
          "css-loader"
        ]
        // exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },
          "css-loader",
          'sass-loader'
        ]
      },
    ]
  };

  if (!isProd) {
    config.module.rules = [
      ...config.module.rules,
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/
      },
    ]
  }

  config.plugins = [
    new HappyPack({
      id: 'ts',
      loaders: [
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true
          }
        }
      ],
      threads: 4
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      chunkFilename: "[id].css",
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin()
  ]

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }

  config.mode = isProd ? 'production' : 'development';

  config.devtool = isProd ? 'none' : 'source-map';

  return isProd ? config : { ...config, devServer };
};
