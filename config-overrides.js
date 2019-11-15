const path = require('path')

module.exports = {
  webpack: function(config, env) {

    const src = path.join(path.resolve(__dirname, '.'), '/src/')

    config.module.rules.push({
      // JavaScript / JSON
      test    : /\.(js|jsx|ts|tsx)$/,
      include : [
        src,
      ],
      exclude: /src\/assets/,
      use : [{
        loader  : 'babel-loader',
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
    })

    return config;
  }
}
