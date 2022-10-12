describe('Sign up', () => {
  it('load page', () => {
    cy.visit('http://localhost:3000');
  });
  it('redirect to sign up', () => {
    cy.get('button').contains('Sign Up').click();
    cy.url().should('eq', 'http://localhost:3000/signup');
  });
});
describe('Log In', () => {
  it('load page', () => {
    cy.visit('http://localhost:3000');
  });
  it('redirect to log in', () => {
    cy.contains('Log In').click();
    cy.url().should('eq', 'http://localhost:3000/login');
  });
});
describe('GitHub', () => {
  it('load page', () => {
    cy.visit('http://localhost:3000');
  });
  it('redirect to github', () => {
    cy.get('a').contains('GitHub').click();
    cy.url().should('eq', 'https://github.com/DongHY1/pwc-follow');
  });
});
export {};
