/// <reference types="cypress" />

describe('Context: My First Test', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/multiple_buttons');
  });

  it('Check Different Button Actions', () => {
    // select a button with text
    cy.contains('Button 2').should('be.visible').click();
    cy.contains('Clicked on button two!').should('be.visible');

    // find element with class attribute and create a list then select 3rd element from the list

    cy.get('.btn.btn-primary').then(($buttons) => {
      cy.wrap($buttons).eq(2).click(); // zero indexed list
      // assert the text
      cy.contains('Clicked on button three!').should('be.visible');
    });

    // you get all buttons with tagName; each method is creating a loop
    cy.get('button').each((item, index, list) => {
      // assert length of the list, verify number of buttons
      expect(list).to.have.length(6);
      expect(item).to.have.attr('onclick');
    });

    // I will get all buttons as in the previous approach, get only the item and check for text of each item, if it is
    // equals to Button 4, then click on it.
    cy.get('button').each((item, index, list) => {
      if (item.text() === 'Button 4') {
        cy.log(item.text()); // this command write the text at the test console
        // item.click(); you cannot use cypress click function on JQuery element
        cy.wrap(item).click();
        cy.contains('Clicked on button four!').should('be.visible');
      }
    });

    // Headless run

    // npx cypress run --headless -b chrome
  });
});
