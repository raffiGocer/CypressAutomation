class Auth {
  // difference from Java, the class name does not have to be same with the file name
  // you can put more than one class in a file,and none of them have any superiority over each other

  login(user_name, password) {
    cy.get('[name="username"]').type(user_name);
    cy.get('[name="password"]').type(password);
    cy.get('#wooden_spoon').click();
  }

  logout() {
    cy.contains('Logout').should('be.visible').click();
  }
}

const auth = new Auth(); // object of the class we made

module.exports = {
  auth,
};
