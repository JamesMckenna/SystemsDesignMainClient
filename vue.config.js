var TerserPlugin = require("terser-webpack-plugin");
var WebpackObfuscator = require("webpack-obfuscator");
var path = require("path");

const terserOptionsCompress = {
  defaults: true, //keep defaults unless otherwise explicitly changed in options.property below
  booleans_as_integers: true, // (default: false) -- Turn booleans into 0 and 1, also makes comparisons with booleans use == and != instead of === and !==.
  drop_console: true, // (default: false) -- Pass true to discard calls to console.* functions. If you wish to drop a specific function call such as console.info and/or retain side effects from function arguments after dropping the function call then use pure_funcs instead.
  ecma: "ESNext", // (default: 5) -- Pass 2015 or greater to enable compress options that will transform ES5 code into smaller ES6+ equivalent forms.
};

//Default preset, High performance - https://github.com/javascript-obfuscator/javascript-obfuscator#default-preset-high-performance
const webpackObfuscatorOptions = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: 0,
  disableConsoleOutput: false,
  identifierNamesGenerator: "hexadecimal",
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  splitStrings: false,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: "variable",
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
};

module.exports = {
  lintOnSave: false,
  devServer: {
    client: {
      logging: "verbose",
      overlay: {
        warnings: true,
        errors: true,
      },
      reconnect: 6,
    },
    headers: [
      {
        key: "Example-Header",
        value: "ExampleHeaderValue",
      },
      {
        key: "Example-Header-two",
        value: "MoreThanOneHeaderNeedsToBeArrayOfObjects",
      },
      {
        key: "A-Single-Header",
        value: "Can-Be-Coded-As-Header-Name-colon-HeaderValue",
      },
    ],
  },
  productionSourceMap: process.env.NODE_ENV === "development",
  publicPath: "/",
  integrity: true,
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          include: "./src/*",
          exclude: [path.resolve(__dirname, "node_modules")],
          extractComments: true,
          minify: TerserPlugin.terserMinify,
          terserOptions: {
            ecma: "ESNext",
            compress: terserOptionsCompress,
            mangle: true, // Note `mangle.properties` is `false` by default.
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.js$/,
          exclude: [path.resolve(__dirname, "node_modules")],
          enforce: "post",
          use: {
            loader: WebpackObfuscator.loader,
            options: webpackObfuscatorOptions,
          },
        },
      ],
    },
  },
};
