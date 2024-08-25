describe('SignIn Page', () => {
    beforeEach(() => {
      cy.visit('/signin');
    });
  
    it('renders the back link with the correct icon', () => {
      cy.get('a[href="/"]').should('exist');
      cy.get('a[href="/"]').find('svg').should('exist');
    });
  
    it('renders the SignInForm component', () => {
      cy.get('form').should('exist');
    });
  
    it('back link has correct styles', () => {
      cy.get('a[href="/"]').should('have.class', 'ml-4 hover:scale-105 transition-transform duration-300 ease-in-out');
    });
  });