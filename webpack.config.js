const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const filename = devMode ? '[name]' : '[name].[contenthash]';

module.exports = {
  entry: {
    main: path.join(__dirname, 'client', 'app.js'),
  },

  output: {
    filename: `js/${filename}.js`,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.scss', '.json', '.vue', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_mudules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },

  watchOptions: {
    ignored: /node_modules/,
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](vue|vue-router|axios)[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },

  devServer: {
    host: 'kado.test',
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        pathRewrite: { '^/api': '' },
      },
    },
    port: 8080,
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['js', 'css', '!.gitignore'],
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/${filename}.css`,
      chunkFilename: `css/${filename}.css`,
    }),
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    new CopyPlugin([
      { from: path.join(__dirname, 'node_modules/feather-icons/dist/feather-sprite.svg'), to: 'svg' },
      { from: path.join(__dirname, 'node_modules/notyf/notyf.min.css'), to: 'css' },
    ]),
  ],
};
