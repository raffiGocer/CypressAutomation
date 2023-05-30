describe('How to do API tests with cypress', () => {
  it('Simple GET request, check status headers and body', () => {
    cy.request({
      // this function takes a json object as parameter, and inside our json object, we define core parts of HTTP request
      method: 'GET',
      // hardcoded url: "https://demoqa.com/BookStore/v1/Books"
      url: `${Cypress.env('apiUrl')}${Cypress.env('apiBooks')}`,
      // other than method and url the rest of the options depend on your test case
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      // cy.log(response.body.books[0].isbn);
      // verify second book has title: Learning JavaScript Design Patterns
      expect(response.body.books[1].title).to.equal('Learning JavaScript Design Patterns');
      expect(response.headers.connection).to.equal('keep-alive');
      const { books } = response.body;

      // a loop for verification the titles
      const index = 0;
      cy.fixture('bookTitles').then((expectedBookTitle) => {
        for (let i = 0; i < 8; i++) {
          expect(response.body.books[i].title).to.equal(expectedBookTitle[i]);
          console.log(expectedBookTitle[i]);
        }
      });
    });
  });
});
