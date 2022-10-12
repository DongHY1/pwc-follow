describe('Login Page', () => {
  before(() => {
    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });

  it('passes', () => {
    cy.visit('http://localhost:3000/login');
  });
  it('should fill login form and login user and redirect to home page', () => {
    // fill username
    cy.get('#email').type('test@qq.com').should('have.value', 'test@qq.com');
    // fill password
    cy.get('#password').type('testtest').should('have.value', 'testtest');
    // submit
    cy.get('button').contains('Sign In').click();
    // redirect to home
    cy.url().should('contain', 'http://localhost:3000');
  });
});
