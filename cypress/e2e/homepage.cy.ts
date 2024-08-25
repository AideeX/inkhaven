describe('Homepage for authenticated users', () => {
    beforeEach(() => {
   
        Cypress.on('uncaught:exception', (err) => {
         
          if (err.message.includes('Hydration failed because the initial UI does not match what was rendered on the server')) {
            return false;
          }
          return true;
        });
     
      cy.visit('/home');
    });
  
    it('renders the Header component', () => {
      cy.get('header').should('exist');
      cy.get('header').should('be.visible');
    });
  
    it('renders the MainContent component', () => {
      cy.get('main').should('exist');
      cy.get('main').should('be.visible');
    });
  
    it('renders the FeaturedPosts component on large screens', () => {
      cy.viewport('macbook-15'); 
      cy.get('[data-testid="featured-posts"]').should('exist');
      cy.get('[data-testid="featured-posts"]').should('be.visible');
    });
  
    it('renders the CommunityMembers component on large screens', () => {
      cy.viewport('macbook-15'); 
      cy.get('[data-testid="community-members"]').should('exist');
      cy.get('[data-testid="community-members"]').should('be.visible');
    });
  
    it('hides the sidebar components on small screens', () => {
      cy.viewport('iphone-6');
      cy.get('[data-testid="featured-posts"]').should('not.be.visible');
      cy.get('[data-testid="community-members"]').should('not.be.visible');
    });
  
    it('displays the correct layout for large screens', () => {
      cy.viewport('macbook-15'); 
      cy.get('div.container').should('have.class', 'flex');
      cy.get('div.container').should('have.class', 'flex-col');
      cy.get('div.container').should('have.class', 'md:flex-row');
    });
  
    it('displays the correct layout for small screens', () => {
      cy.viewport('iphone-6'); 
      cy.get('div.container').should('have.class', 'flex');
      cy.get('div.container').should('have.class', 'flex-col');
      cy.get('div.container').should('not.have.class', 'md:flex-row');
    });
  });
  