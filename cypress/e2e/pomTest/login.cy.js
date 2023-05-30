import { auth } from '../../support/pages/auth';
import { NavigateTo, navigateTo } from '../../support/pages/navigation';

const LoginLocators = require('../../support/pages/auth');

describe('Auth: Login user with different ways', () => {
  // navigate to the test page
  beforeEach('navigate to login page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage(); // this function we called it from out POM
  });

  it.skip('Happy path scenario using POM FUNCTION', () => {
    // .login('hardcoded variables') -- not a good way
    cy.fixture('user').then((user) => {
      auth.login(user.user2.username, user.user2.password);
    });
    // let's call out custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it.skip('Happy path scenario using POM Locators', () => {
    // .login('hardcoded variables') -- not a good way
    cy.fixture('user').then((user) => {
      // auth.login(user.user2.username, user.user2.password);
      // I need to import the locators object
      LoginLocators.locators.userName.type(user.user2.username);
      LoginLocators.locators.password.type(user.user2.password);
      LoginLocators.locators.submit.click();
    });
    // let's call out custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Check invalid user credentials', () => {
    auth.login('invalid234', 'invalid234'); // beauty of re-usability
    // verify error message
    cy.textExists('Your username is invalid!');
  });
});
