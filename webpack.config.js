const path = require("path");

module.exports = {
  entry: "./frontend/index.js",
  output: {
    path: path.join(__dirname, "backend", "static", "scripts"),
    publicPath: "/",
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: { loader: "ts-loader" },
      },
    ],
  },
};
