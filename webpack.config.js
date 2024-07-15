const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_, args) => {
  return {
    mode: args.mode || "development",
    entry: {
      common: "./src/js/common.js",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "js/[name].js",
    },
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: function () {
                    return [require("autoprefixer")];
                  },
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(jpg|jpeg|png|svg|ico)$/i,
          type: "asset/resource",
          generator: {
            filename: "[path][name].[ext]",
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new HandlebarsPlugin({
        entry: path.join(__dirname, "src", "templates", "pages", "*.hbs"),
        partials: [
          path.join(__dirname, "src", "templates", "partials", "*.hbs"),
        ],
        output: path.join(__dirname, "dist", "[name].html"),
      }),
      new MiniCssExtractPlugin({
        filename: "css/style.css",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "src/images"),
            to: path.join(__dirname, "dist/images"),
          },
        ],
      }),
    ],
    devServer: {
      static: "./dist",
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      allowedHosts: "all",
      client: {
        overlay: {
          warnings: false,
          errors: true,
        },
      },
    },
  };
};
