import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../pages/HomePage';

Given('I open the login page', () => {
  HomePage.visit();
});

Then('I see content of Home Page', () => {
  HomePage.homeScreenIsVisible();
});

When('I save old url to compare later', () => {
   HomePage.saveOldUrl();
});

Then('I click on the {string} button', (button) => {
   cy.clickButtonByText(button);
});

Then('I click on the {string} button and get response', (button) => {
   HomePage.captureCurrentUrl();
   cy.clickButtonByText(button);
   HomePage.getResponseBody();
});

Then('I can see the new url is different from the old one', () => {
  HomePage.compareUrlWithSaved();
});

Then('I validate that new URL contains ChileAutos URL', () => {
  HomePage.validateUrlIsChileAutos();
});

When('I apply the {string} search filters', (setName) => {
  cy.wait(5000);
  cy.fixture('searchFilters').then((data) => {
    const filters = data[setName];
    Object.entries(filters).forEach(([filter, value]) => {
      HomePage.selectParametersForFilter(value, filter);
    });
  });
});

Then('I click on Buscar button', () => {
   HomePage.clickSearchButton();
});

When('I click on the {string} menu', (menu) => {
   HomePage.captureCurrentUrl();
   HomePage.selectMenu(menu);
});

Then('I click on the {string} option', (option) => {
   HomePage.selectOption(option);
   HomePage.getResponseBody();
});
