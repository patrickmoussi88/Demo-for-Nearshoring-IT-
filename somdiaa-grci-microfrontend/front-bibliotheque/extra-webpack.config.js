const { shareAll, withModuleFederationPlugin } = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "bibliotheque",

  exposes: {
    // Preferred way: expose corse-grained routes
    //"./routes": "./src/app/controle-interne.routes.ts",

    // Technically possible, but not preferred for Micro Frontends:
    // Exposing fine-grained components
    "./Bibliotheque": "./src/app/bibliotheque/bibliotheque.component.ts",
    "./Archives": "./src/app/archives/archives.component.ts"
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^16.1.0" },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^16.1.0" },
    "@angular/router": { singleton: true, strictVersion: true, },
    "rxjs": { singleton: true, strictVersion: true },
    "single-spa-angular": { singleton: true, strictVersion: true },
    "@angular/common/http": { singleton: true, strictVersion: true }
  }

});

