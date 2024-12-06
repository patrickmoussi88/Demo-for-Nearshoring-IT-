const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
//const mf = require("@angular-architects/module-federation/webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "somdiaa-grci";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    optimization: {
      runtimeChunk: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "somdiaa",
        library: { type: "var" },
        remotes: {
          home: "home",
          dashbord_template: "dashbord_template",
        },
        shared: {
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^16.1.0" },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^16.1.0" },
          "@angular/router": { singleton: true, strictVersion: true, },
          "single-spa-angular": { singleton: true, strictVersion: true },
        },
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};
