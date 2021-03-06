/* global process */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseDir = process.cwd();
const env = process.env; // eslint-disable-line no-undef

const createConfig = isProduction => ({

  context: path.resolve(baseDir, "./src"),

  entry: {
    index: path.resolve(baseDir, env.ENTRY || "./src/index.js"),
  },

  output: {
    path: path.resolve(baseDir, "./dist"),
    filename: "js/[name].js"
  },

  resolve: {
    // Make sure that Mithril is included only once
    alias: {
      "mithril/stream": path.resolve(baseDir, "node_modules/mithril/stream/stream.js"),
      // Keep in this order!
      "mithril": path.resolve(baseDir, "node_modules/mithril/mithril.js"),
    },
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            configFile: isProduction
              ? "../../babel.config.umd.js"
              : "../../babel.config.es.js"
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: "[local]"
            }
          },
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/app.css"
    }),
  ],

  devtool: "source-map"

});

module.exports = createConfig;
