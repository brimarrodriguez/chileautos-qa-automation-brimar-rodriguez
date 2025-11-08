import "./commands";

require('cypress-xpath');

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message && err.message.includes("Unexpected token '<'")) {
    return false;
  }
});
