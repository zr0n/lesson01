const {
    join
} = require('path') //Shortcurt para path.join
module.exports = {
    entry: join(__dirname, 'public', 'js', 'main.js'), //join não precisa de /
    output: {
        path: join(__dirname, 'public', 'build'),
        filename: 'build.js',
        publicPath: '/public/'
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
  ],
    }
};