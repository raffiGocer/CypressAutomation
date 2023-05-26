/// <reference types="cypress" />

describe('Cypress WebTable Tests', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * if you need to navigate to a Url, other than the Base Url, you can define it at describe or
   * in in the it block
   */

  beforeEach('Navigate to upload page', () => {
    cy.clearCookies();
    cy.visit('/webtables');
  });

  xit('Check finding and editing a record', () => {
    // locate the table body - then navigate through this element to find Alden, then update info with another person
    cy.get('.rt-tbody') // get me table body
      .contains('.rt-tr-group', 'Alden') // get me the row that contains Alden
      .then((row) => {
        // store it into a Jquery element
        cy.wrap(row).find('[title="Edit"]').click();
        // fill in the box with new person
        cy.get('#firstName').clear().type('Harvey');
        cy.get('#lastName').clear().type('Spencer');
        cy.get('#submit').click();
        // from cypress test perspective, we are still inside the row element
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Spencer');
      });
  });
  xit('Check finding and deleting a record', () => {
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden')
      .then((row) => {
        // click on Delete button for Alden record
        cy.wrap(row).find('[title="Delete"]').click();
      });
    // Assert that table does NOT have Alden record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // search for Alden in the body
    cy.get('#searchBox').type('Alden');
    // Assert that there is no record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // No Data found element is visible or not
    cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
  });

  xit('Check search for different age records', () => {
    // define age groups
    const ageGroup = [29, 39, 45, 77];
    // for each age group perform same test scenario
    cy.wrap(ageGroup).each((age) => {
      // type age into search box
      cy.get('#searchBox').clear().type(age);
      // verify if that age exists, second number of records
      if (age === 77) {
        // negative scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      } else {
        // positive scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
        cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
      }
    });
  });

  xit('Check adding a new record - Bad code practice', () => {
    // click on add button
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Harvey');
    cy.get('#lastName').type('Spector');
    cy.get('#userEmail').type('spector@example.com');
    cy.get('#age').type('40');
    cy.get('#salary').type('70000');
    cy.get('#department').type('legal');
    cy.get('#submit').click();
    // assert that new record is added
    cy.get('.rt-tbody') // get me table body
      .contains('.rt-tr-group', 'Harvey') // get me the row that contains Alden
      .then((row) => {
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Spector');
        cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'spector@example.com');
        cy.wrap(row).find('.rt-td').eq(4).should('contain', '7000');
        cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal');
      });
  });

  it('Adding a new record - Better code practice', () => {
    // click on add button
    cy.get('#addNewRecordButton').click();
    cy.fixture('user').then((user) => {
      const columnNames = Object.keys(user.user1); // goes to fixtures folder, gets user1 object keys and stores into
      // columnNames Array
      const userData = Object.values(user.user1);
      cy.wrap(columnNames).each((columnName, index) => {
        // cy.log(columnNames);
        // cy.log(userData[index]);

        cy.get(`#${columnName}`).type(`${userData[index]}`);
      });

      cy.get('#submit').click();
      cy.get('.rt-tbody') // get me table body
        .contains('.rt-tr-group', userData[0]) // get me the row that contains Alden
        .then((row) => {
          cy.wrap(userData).each((value, index) => {
            cy.wrap(row).find('.rt-td').eq(index).should('contain', value);
          });
        });
    });
  });
});
