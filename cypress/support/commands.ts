// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('assertLoggedIn', () => {
  cy.window().its('localStorage.fd-token').should('be.a', 'string');
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('input[name=email]')
    .type(email)
    .get('input[name=password]')
    .type(password)
    .get('button[type=submit]')
    .click();
  cy.assertLoggedIn();
});
