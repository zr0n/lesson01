const { join } = require('path')
module.exports = {
    entry: 'js/main.js',
    output: {
        path: join(__dirname, 'public/js', 'public/build'),
        filename: 'build.js'
    },

module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
}
};
