"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        exclude: [path.resolve(__dirname, "../src/icons")], //排除字体图标文件
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [path.resolve(__dirname, "../src/icons")],
        options: {
          symbolId: "icon-[name]" //这个没有生效，生效的是默认的name
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
  // chainWebpack: config => {
  //   // svg rule loader
  //   const svgRule = config.module.rule("svg"); // 找到svg-loader
  //   svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
  //   svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
  //   svgRule // 添加svg新的loader处理
  //     .test(/\.svg$/)
  //     .use("svg-sprite-loader")
  //     .loader("svg-sprite-loader")
  //     .options({
  //       symbolId: "icon-[name]"
  //     });

  //   // 修改images loader 添加svg处理
  //   const imagesRule = config.module.rule("images");
  //   imagesRule.exclude.add(resolve("src/icons"));
  //   config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  // }
};
