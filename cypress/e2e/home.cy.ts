describe('Landing page for unauthenticated users', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the Header component', () => {
    cy.get('header').should('exist');
  });

  it('renders the HeroWrapper component', () => {

    cy.wait(1000); 
    cy.get('[data-testid="hero-wrapper"]', { timeout: 10000 }).should('exist');
  });

  it('renders the AboutWrapper component', () => {
    cy.wait(1000);
    cy.get('[data-testid="about-wrapper"]', { timeout: 10000 }).should('exist');
  });

  it('renders the FeaturesWrapper component', () => {
    cy.wait(1000);
    cy.get('[data-testid="features-wrapper"]', { timeout: 10000 }).should('exist');
  });

  it('renders the Footer component', () => {
    cy.get('footer').should('exist');
  });

  it('renders the BackToTopButton component', () => {
    cy.get('button').contains('Back to Top', { timeout: 10000 }).should('exist');
  });
});
