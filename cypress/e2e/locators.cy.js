/// <reference types="cypress" />

describe('Find or Get Elements by Using Different Locators',() => {
   
    beforeEach(() => {
        //runs before each test case, like beforeMethod in TestNG
        cy.clearCookies();
        cy.visit('/login');
    })
    

    it('Check different locators strategies', () =>{
        //By CSS locator
        cy.get("input[name='username']").type("CydeoStudents"); // every statement creates an object to be interacted, 
        //and next command makes operation to the object created at the previous statement  
        //attribute name and value
        cy.get("[type='text']").clear(); //clear what was typed 

        //tagName
        cy.get("input").each((item, index, list) => {
            //assert the length of the list is 2 
            expect(list).to.have.length(2);
            expect(item).to.have.attr("type");
        })

      // by attribute name
      cy.get('[type]');

      // by className
      cy.get('.btn.btn-primary');

      // By id
      cy.get('#wooden_spoon');

      // if I want to use text: no xpath in cypress, but it still possible with a different approach
      cy.get('button').should('contain','Login').click();



    })

    it('Finding elements by Travelling thru the DOM element', () =>{
        //travel to find the login button: locate username box- go to parent form- then find the button

        cy.get('input[name="username"]').parents('form').find('button').should('contain','Login').click();

    })

    it.only('Check different Type of Assertions', ()=> {
        //Cypress itself bundles assertions provided by Chai, Sinon and JQuery libraries
        //Should Assertions: does the assertion directly on the object itself
        cy.get('#wooden_spoon')
        .should('contain','Login')
        .and('have.class','btn btn-primary');
        // ecpect assertion: also called explicit assertion: create a subject of our test, then we implement different actions

        cy.get('#wooden_spoon').then((buttonElement) => {
            expect(buttonElement).to.have.text('Login');
            expect(buttonElement).to.have.class('btn btn-primary');
        } )

    })
   
})