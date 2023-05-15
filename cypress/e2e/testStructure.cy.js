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
    it('Test 2', () => {
        expect(false).to.equal(false);
    })
    it('Test 3', () => {
        expect(false).not.to.equal(true);
    })
    it('Test 4', () => {
        expect(5).to.equal(5);
    })
    it('Test 5', () => {
        expect(true).to.equal('5' == 5);
    })
})