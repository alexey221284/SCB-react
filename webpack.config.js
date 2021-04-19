const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const devServer = {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    historyApiFallback: true
};
module.exports = (mode) => {
  console.info('Run mode: ', mode);
  return {
    mode: mode,
    entry: './src/index.tsx',
    devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
    devServer: mode === 'development' ? devServer : {},
    output: {
      filename: mode === 'production' ? '[name].js': '[name].bundle.js' ,
      path: path.resolve(__dirname, 'dist'),
      publicPath: mode === 'development' ? '/' : './',
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          use: {
            loader: 'ts-loader',
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
            },
            'sass-loader'
          ]
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CopyWebpackPlugin(
          {
            patterns: [
              { from: path.resolve(__dirname, 'src/assets/img'), to: `img` }
            ]
          },
      ),
      new Dotenv()
    ],
  }
};
