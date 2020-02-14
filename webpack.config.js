const webpack = require('webpack');
const path = require('path')

const src = path.join(path.resolve(__dirname, '.'), '/src/')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          src
        ],
        exclude: [
          /node_modules/,
          /src\/assets/
        ],
        use: [{
          loader: 'babel-loader',
          options : {
            babelrc        : false,
            cacheDirectory : true,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator'
            ],
            ignore: [
              'node_modules',
              'src/assets/*'
            ]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules : [
      src,
      'node_modules',
    ],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
