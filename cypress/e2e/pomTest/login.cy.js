import { auth } from '../../support/pages/auth';
import { NavigateTo, navigateTo } from '../../support/pages/navigation';

describe('Auth: Login user with different ways', () => {
  // navigate to the test page
  beforeEach('navigate to login page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage(); // this function we called it from out POM
  });

  it('Happy path scenario using POM function', () => {
    // .login('hardcoded variables') -- not a good way
    cy.fixture('user').then((user) => {
      auth.login(user.user2.username, user.user2.password);
    });
    // let's call out custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });
});
