const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'firebaseApp': path.resolve(__dirname, 'src/libs/firebaseApp'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: isProduction ? false : 'source-map',
  devServer: {
    port: 4002,
    host: '0.0.0.0',
    historyApiFallback: true,
    server: {
      type: 'https',
    },
    proxy: {
      '/api': {
        target: 'https://localhost:4000',
        pathRewrite: { '^/api': '' },
        secure: false,
      },
      '/api2': {
        target: 'https://localhost:4001',
        pathRewrite: { '^/api2': '' },
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|ico)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'assets/images/[name].[contenthash:8][ext]'
        }
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      'process.env.GA_MEASUREMENT_ID': JSON.stringify(process.env.GA_MEASUREMENT_ID),
      'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
      'process.env.REACT_APP_AUTH_DOMAIN': JSON.stringify(process.env.REACT_APP_AUTH_DOMAIN),
      'process.env.REACT_APP_PROJECT_ID': JSON.stringify(process.env.REACT_APP_PROJECT_ID),
      'process.env.REACT_APP_STORAGE_BUCKET': JSON.stringify(process.env.REACT_APP_STORAGE_BUCKET),
      'process.env.REACT_APP_MESSAGING_SENDER_ID': JSON.stringify(process.env.REACT_APP_MESSAGING_SENDER_ID),
      'process.env.REACT_APP_APP_ID': JSON.stringify(process.env.REACT_APP_APP_ID),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
