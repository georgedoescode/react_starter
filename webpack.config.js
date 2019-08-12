const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // webpack always requires and entry point
  entry: "./src/index.js",
  // specify the output path for build
  output: {
    path: path.join(__dirname, "dist"),
    // contenthash so SW know something has changed
    filename: "[name].[contenthash].min.js"
  },
  optimization: {
    // split out vendor code
    splitChunks: {
      chunks: "all"
    }
  },
  // config for our local dev server, this gives us nice live reloading when working locally
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    port: 9000
  },
  // define rules for different file types
  module: {
    rules: [
      // JS + JSX
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        /* JS */
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["babel-plugin-styled-components"]
          }
        }
      },
      // SASS
      {
        test: /\.scss$/,
        use: [
          // in production mode, extract CSS to a separate file
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")()
              ]
            }
          }
        ]
      },
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"]
      },
      // IMAGES
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "responsive-loader",
            options: {
              adapter: require("responsive-loader/sharp"),
              quality: 85,
              min: 320,
              max: 1920,
              placeholder: true
            }
          }
        ]
      },
      // FONTS
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  // template for index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    // adding contenthash to css so that SW knows when to update
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    // minify css!
    new OptimizeCssAssetsPlugin({}),
    // clean dist/ on each build / dev reload
    new CleanWebpackPlugin()
  ]
};
