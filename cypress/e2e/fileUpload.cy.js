/// <reference types="cypress" />

describe('Cypress File Upload Tests', () => {
  /**
   * Step 1
   * In order to upload files in Cypress we need to install a plugin
   * we will run the follwoing command:
   * npm install -dev cypress-file-upload
   * Step 2
   * then, we need to import necessary command to our project
   * in order to support folder we have commands, js.file: this file is a good place for putting our utility methods (functions)
   * add following line:
   * import 'cypress-file-upload';
   * Step 3
   * The file that you want to upload should be in your fixture folder
   */

  beforeEach('Navigate to upload page', () => {
    // runs before each test case, like beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/upload');
  });

  it('Check upload action', () => {
    cy.get('input#file-upload').attachFile('pic.png');
    // click on upload button
    cy.get('#file-submit').click();
    // assert that path message is displayed.
    cy.get('#uploaded-files').then(() => {
      cy.contains('pic.png').should('be.visible');
    });
  });
});
