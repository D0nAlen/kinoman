const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`,
  devServer: {
    static: path.join(__dirname, `public`),
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
      // localesToKeep: ['ru'],
    })
  ]
}