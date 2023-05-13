/// <reference types="cypress" />

describe('Context: My First Test',() => {
    before(() => {
        // runs once before all test cases in this test block, like beforeClass in TestNG
    })
    beforeEach(() => {
        //runs before each test case, like beforeMethod in TestNG
        cy.clearCookies();
    })
    after(() => {
        // runs once after all test cases in this block, similar to afterClass in TestNG
    })

    afterEach(() => {
        //runs after each test case, like afterMethod in TestNG 
    })
    it('Opening a web application', () =>{
        cy.visit('/registration_form');
        
    })
})