const baseUrl = 'http://localhost:3000/';

describe('Navbar on Mobile', () => {
  it('should contain a link redirecting to the home page', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('nav').find('a[href="/"]').click();
    cy.url().should('equal', baseUrl);
  });

  it('Should contain a button opening/closing the menus popup', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('div[id="dynamicMenuPopUp"]')
      .should('have.class', 'slideOut')
      .should('have.css', 'width', '0px');
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]')
      .should('have.class', 'slideIn')
      .should('not.have.css', 'width', '0px');
  });

  it('Should not contain the desktopMenu', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('div[id="desktopMenu"]').should('have.css', 'display', 'none');
  });

  it('Should contain a link redirecting the the menus page', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/les-menus"]').click();
    cy.url().should('equal', baseUrl + 'les-menus');
  });

  it('Should contain a link redirecting the the Carte page', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/la-carte"]').click();
    cy.url().should('equal', baseUrl + 'la-carte');
  });

  it('Should contain a link redirecting the the Contact page', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/contact"]').click();
    cy.url().should('equal', baseUrl + 'contact');
  });

  it('Should contain a link redirecting the the Connexion page', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/connexion"]').click();
    cy.url().should('equal', baseUrl + 'connexion');
  });

  it('Should contain a link redirecting the the Reserver page', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/reserver"]').click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

describe('Navbar Desktop', () => {
  it('should contain a link redirecting to the home page', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('nav').find('a[href="/"]').click();
    cy.url().should('equal', baseUrl);
  });

  it("Shouldn't contain a button opening/closing the menus popup", () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('div[id="dynamicMenuPopUp"]')
      .should('have.class', 'slideOut')
      .should('have.css', 'width', '0px');
    cy.get('nav')
      .find('button[name="hamburgerMenu"]')
      .should('have.css', 'display', 'none');
  });

  it('Should contain the desktopMenu', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('div[id="desktopMenu"]').should('have.css', 'display', 'flex');
  });

  it('Should contain a link redirecting the the menus page', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('div[id="desktopMenu"]').find('a[href="/les-menus"]').click();
    cy.url().should('equal', baseUrl + 'les-menus');
  });

  it('Should contain a link redirecting the the Carte page', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('div[id="desktopMenu"]').find('a[href="/la-carte"]').click();
    cy.url().should('equal', baseUrl + 'la-carte');
  });

  it('Should contain a link redirecting the the Contact page', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('div[id="desktopMenu"]').find('a[href="/contact"]').click();
    cy.url().should('equal', baseUrl + 'contact');
  });

  it('Should contain a link redirecting the the Connexion page', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('div[id="desktopMenu"]').find('a[href="/connexion"]').click();
    cy.url().should('equal', baseUrl + 'connexion');
  });

  it('Should contain a link redirecting the the Reserver page', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('div[id="desktopMenu"]').find('a[href="/reserver"]').click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

describe('Strong Points Section Mobile', () => {
  it('should contain a link redirecting to /reserver', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('article[id="strongPoints"]').find('a[href="/reserver"]').click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

describe('Strong Points Section Desktop', () => {
  it('should contain a link redirecting to /reserver', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('article[id="strongPoints"]').find('a[href="/reserver"]').click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

export default describe;
