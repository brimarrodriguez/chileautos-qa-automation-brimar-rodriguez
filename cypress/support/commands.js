import HomePage from './pages/HomePage';

Cypress.Commands.add("validateUrlContains", (content) => {
  cy.url().should("include", content);
});

Cypress.Commands.add("clickButtonByText", (buttonText) => {
  cy.contains("button, a", buttonText, { matchCase: false })
    .should("be.visible")
    .click({ force: true });
});
