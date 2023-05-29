/// <reference types="cypress" />

describe('Alerts in Cypress Test Environment', { baseUrl: 'https://demoqa.com' }, () => {
  beforeEach(() => {
    // runs before each test case, like beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/alerts');
  });

  it('Check alert confirmation', () => {
    /**
     * Browser commands, window:alert, window:confirm, window: on etc...
     */

    const stub = cy.stub();
    cy.on('window:confirm', stub); // when this confirmation command initiated store and give the control to the stub function

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => true);

    cy.contains('You selected Ok').should('be.visible');
  });

  it('Check alert cancellation', () => {
    /**
     * Browser commands, window:alert, window:confirm, window: on etc...
     */

    const stub = cy.stub();
    cy.on('window:confirm', stub); // when this confirmation command initiated store and give the control to the stub function

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => false); // cancel the alert confirmation

    cy.contains('You selected Cancel').should('be.visible');
  });
});
