const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function generateHtmlWebpackPlugins(templatesDir) {
  const templateFiles = fs.readdirSync(path.join(__dirname, templatesDir));

  return templateFiles.map(item => {
    const fileParts = item.split(".");
    const name = fileParts[0];
    const extension = fileParts[1];

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.join(__dirname, `${templatesDir}/${name}.${extension}`)
    });
  });
}

const htmlPlugins = generateHtmlWebpackPlugins("./src/pug/pages");
const htmlBeautify = [
  new HtmlBeautifyPlugin({
    config: {
      html: {
        end_with_newline: true,
        indent_size: 4,
        indent_with_tabs: true,
        indent_inner_html: true,
        preserve_newlines: true,
        unformatted: ["p", "i", "b", "span"]
      }
    }
  })
];

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/index.bundle.js"
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: ["html-loader?interpolate"]
      // },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        }
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
        test: /\.(woff(2)?|ttf|eot|otf)$/i,
        loader: "file-loader",
        options: {
          outputPath: "fonts",
          publicPath: "../fonts",
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ].concat(htmlPlugins, htmlBeautify)
};
