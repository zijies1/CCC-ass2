const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader"
       }
     },
     {
       test: /\.html$/,
       use: [
         {
           loader: "html-loader"
         }
       ]
     },
     {
         test: /\.(png|jp(e*)g|svg)$/,
         use: [{
             loader: 'url-loader',
             options: {
                 limit: 8000, // Convert images < 8kb to base64 strings
                 name: 'images/[hash]-[name].[ext]'
             }
         }]
     },
     //css loader
     {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
     },
   ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};
