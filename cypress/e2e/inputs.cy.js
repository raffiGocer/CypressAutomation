/// <reference types="cypress" />

describe('Input Forms Tests', () => {
   
    beforeEach('Navigate to registration page', () => {
      // runs before each test case, like beforeMethod in TestNG
      cy.clearCookies();
      cy.visit('/registration_form');
    });
    
    it('Check different input box fields and verify', () => {
        //fill the form for username and other info
        cy.get('input[name="firstname"]').type('Mike');
        cy.get('input[name="lastname"]').type('Brown');
        cy.get('input[name="username"]').type('BraveHeart');

        /**
         * Math.random(): creates a number between 0 - 1 ~ 0.005678
         * Math.floor(): makes it a whole number
         */

        let email = `formtest${Math.floor(100000+Math.random()*900000)}@gmail.com`
        cy.get('input[name="email"]').type(email);



    });
    
  });
  