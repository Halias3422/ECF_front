const baseUrl = 'http://localhost:3000/connexion';

describe('Connexion on Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
  });

  it('should contain a form', () => {
    cy.get('form');
  });

  it('should contain a mail input', () => {
    cy.get('form').find('input[type="email"]');
  });

  it('should contain a password input', () => {
    cy.get('form').find('input[type="password"]');
  });

  it('should contain a connexion submit input', () => {
    cy.get('form').find('input[value="Connexion"]');
  });

  it('should contain a subscribe link', () => {
    cy.get('form').find('a[href="/inscription"]');
  });
});

describe('Connexion on Desktop', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
  });

  it('should contain a form', () => {
    cy.get('form');
  });

  it('should contain a mail input', () => {
    cy.get('form').find('input[type="email"]');
  });

  it('should contain a password input', () => {
    cy.get('form').find('input[type="password"]');
  });

  it('should contain a connexion submit input', () => {
    cy.get('form').find('input[value="Connexion"]');
  });

  it('should contain a subscribe link', () => {
    cy.get('form').find('a[href="/inscription"]');
  });
});

export default describe;
