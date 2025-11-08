const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const envUrls = {
  dev: "https://latam-retail-merlin-homepage-web-frontend-ore.latam.csnglobal.net",
  qa: "https://latam-retail-merlin-homepage-web-frontend-ore.latam.csnglobal.net",
  prod: "https://latam-retail-merlin-homepage-web-frontend-ore.latam.csnglobal.net"
};
https://latam-retail-merlin-homepage-web-frontend-ore.latam.csnglobal.net/__/#/specs
module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      // Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      const envName = process.env.ENVIRONMENT || config.env.ENVIRONMENT || "prod";
      config.baseUrl = envUrls[envName] || envUrls.prod;

      return config;
    },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    video: true,
    screenshotsFolder: "cypress/screenshots",
    reporter: "spec"
  },
  env: {
    ENVIRONMENT: "prod"
  }
});
