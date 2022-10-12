describe('Login Page', () => {
  before(() => {
    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });

  it('passes', () => {
    cy.visit('http://localhost:3000/signup');
  });
  it('should fill signin form and register user and redirect to home page', () => {
    // fill username
    cy.get('#name').type('testuser1').should('have.value', 'testuser1');
    // fill email
    cy.get('#email')
      .type('testuser1@qq.com')
      .should('have.value', 'testuser1@qq.com');
    // fill password
    cy.get('#password').type('testtest').should('have.value', 'testtest');
    // submit
    cy.get('#sign').click();
    // redirect to home
    cy.url().should('equal', 'http://localhost:3000/login');
  });
});
