const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  config.output = {
    ...config.output,
    uniqueName: "dashbord_template",
  };
  config.optimization = { ...config.optimization, runtimeChunk: false };
  config.plugins = [
    ...config.plugins,
    new ModuleFederationPlugin({
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^16.1.0" },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^16.1.0" },
        "@angular/router": { singleton: true, strictVersion: true, },
        "rxjs": { singleton: true, strictVersion: true },
        "single-spa-angular": { singleton: true, strictVersion: true },
        "@angular/common/http": { singleton: true, strictVersion: true },
      },
      name: "dashbord_template",
      filename: "remoteEntry.js",
      exposes: {
        "./Template": "./src/main.single-spa.ts",
      },
      remotes: {
        plan_ation: "plan_action@http://localhost:4205/remoteEntry.js",
        controle_interne: "controle_interne@http://localhost:4201/remoteEntry.js",
        configuration: "configuration@http://localhost:4207/remoteEntry.js",
        audit_interne: "audit_interne@http://localhost:4203/remoteEntry.js",
        suivi_incident: "suivi_incident@http://localhost:4206/remoteEntry.js",
        bibliotheque: "bibliotheque@http://localhost:4204/remoteEntry.js",
        cartographie_risques: "cartographie_risques@http://localhost:4202/remoteEntry.js"
      }
    }),
  ];

  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
