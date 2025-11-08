export function getCurrentEnv() {
  return Cypress.env("ENVIRONMENT") || "prod";
}
