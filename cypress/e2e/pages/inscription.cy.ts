const baseUrl = 'http://localhost:3000/inscription';

describe('Inscription on Mobile', () => {
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

  it('should contain two password inputs', () => {
    cy.get('form').find('input[type="password"]');
    cy.get('form').find('input[id="passwordInput"]');
    cy.get('form').find('input[id="passwordConfirmationInput"]');
  });

  it('should contain a submit input', () => {
    cy.get('form').find('input[value="Inscription"]');
  });
});

describe('Inscription on Desktop', () => {
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

  it('should contain two password inputs', () => {
    cy.get('form').find('input[type="password"]');
    cy.get('form').find('input[id="passwordInput"]');
    cy.get('form').find('input[id="passwordConfirmationInput"]');
  });

  it('should contain a submit input', () => {
    cy.get('form').find('input[value="Inscription"]');
  });
});
export default describe;
