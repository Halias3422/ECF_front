const baseUrl = 'http://localhost:3000/reserver';

describe('Reserver on Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
  });

  it('should contain a form', () => {
    cy.get('section').find('form');
  });

  it('should contain a number input', () => {
    cy.get('form').should('include.html', 'type="number"');
  });

  it('should contain a date input', () => {
    cy.get('form').should('include.html', 'type="date"');
  });

  it('should contain a textarea', () => {
    cy.get('form').should('include.html', 'textarea');
  });
});

describe('Reserver on Desktop', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
  });

  it('should contain a form', () => {
    cy.get('section').find('form');
  });

  it('should contain a number input', () => {
    cy.get('form').should('include.html', 'type="number"');
  });

  it('should contain a date input', () => {
    cy.get('form').should('include.html', 'type="date"');
  });

  it('should contain a textarea', () => {
    cy.get('form').should('include.html', 'textarea');
  });
});
export default describe;
