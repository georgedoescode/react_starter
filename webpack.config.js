const path = require('path');

// import plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// check env (set in dev / prod scripts in package.json, eg: NODE_ENV=production)
const development = process.env.NODE_ENV === 'development';

// use inline source maps for dev, source map for prod
const sourceMap = development ? 'inline-source-map' : 'source-map';

module.exports = {
  // our entrypoint
  entry: './src/index.js',
  output: {
    // set the path to which the app will be bundled
    path: path.join(__dirname, 'dist'),
    // output
    filename: '[name].bundle.js',
  },
  // use the sourcemap that was previously defined
  devtool: sourceMap,
  // set up dev server (this allows for livereloads during development)
  devServer: {
    // set contentbase to match webpack's output path
    contentBase: 'dist',
    // overlay errors over the browser window
    overlay: true,
  },
  module: {
    // rules for each file type
    rules: [
      // js, eslint
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/, // extensions to test
        exclude: /node_modules/, // ignore node_modules
        loader: 'eslint-loader', // use eslint
      },
      // js, babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // css
      {
        test: /\.css$/,
        // used in order: 1. postcss loader, 2. css-loader, 3. style loader / MiniCssExtractPlugin
        use: [
          development ? 'style-loader' : MiniCssExtractPlugin.loader, // in development, use style loader, in production, extract css to a seperate file
          'css-loader', // loader for css
          'postcss-loader', // loader for postcss, for config see postcss.config.js
        ],
      },
      // images
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    // on each 'build' or 'dev', remove old 'dist/' directory
    new CleanWebpackPlugin('dist'),
    // the 'template index.html file'
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // in production, extract css to a seperate file
    }),
    // copy favicon to dist/
    new CopyWebpackPlugin([{
      from: './public/favicon-32x32.png',
      to: './',
    }]),
  ],
};
