const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/js/index.js",
    install: "./src/js/install.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "text-editor-app",
    }),
    new WebpackPwaManifest({
      name: "text-editor-app",
      short_name: "TextEd",
      description: "Keep track of important tasks!",
      background_color: "#7eb4e2",
      theme_color: "#7eb4e2",
      start_url: "./",
      publicPath: "./",
      icons: [
        {
          src: path.resolve("assets/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
    new InjectManifest({
      swSrc: "./src-sw.js",
      swDest: "src-sw.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
