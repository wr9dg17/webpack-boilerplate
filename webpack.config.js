const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/index.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader?interpolate"]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)$/,
        loader: "file-loader",
        options: {
          outputPath: "fonts",
          name: "[name].[ext]"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: true
  },
  plugins: [
    new ExtractTextPlugin({ filename: "css/style.css" }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src/index.html")
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
    // new HtmlBeautifyPlugin({
    //   config: {
    //     html: {
    //       end_with_newline: true,
    //       indent_size: 4,
    //       indent_with_tabs: true,
    //       indent_inner_html: true,
    //       preserve_newlines: true,
    //       unformatted: ["p", "i", "b", "span"]
    //     }
    //   }
    // })
  ]
};
