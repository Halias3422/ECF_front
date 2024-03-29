const baseUrl = 'http://localhost:3000/';

describe('Navbar on Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
  });

  it('should contain a link redirecting to the home page', () => {
    cy.get('nav').find('a[href="/"]').click();
    cy.url().should('equal', baseUrl);
  });

  it('Should contain a button opening/closing the menus popup', () => {
    cy.get('div[id="dynamicMenuPopUp"]')
      .should('have.class', 'slideOut')
      .should('have.css', 'width', '0px');
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]')
      .should('have.class', 'slideIn')
      .should('not.have.css', 'width', '0px');
  });

  it('Should not contain the desktopMenu', () => {
    cy.get('div[id="desktopMenu"]').should('have.css', 'display', 'none');
  });

  it('Should contain a link redirecting the the menus page', () => {
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/les-menus"]').click();
    cy.url().should('equal', baseUrl + 'les-menus');
  });

  it('Should contain a link redirecting the the Carte page', () => {
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/la-carte"]').click();
    cy.url().should('equal', baseUrl + 'la-carte');
  });

  it('Should contain a link redirecting the the Connexion page', () => {
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/connexion"]').click();
    cy.url().should('equal', baseUrl + 'connexion');
  });

  it('Should contain a link redirecting the the Reserver page', () => {
    cy.get('nav').find('button[name="hamburgerMenu"]').click();
    cy.get('div[id="dynamicMenuPopUp"]').find('a[href="/reserver"]').click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

describe('Navbar Desktop', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
  });

  it('should contain a link redirecting to the home page', () => {
    cy.get('nav').find('a[href="/"]').click();
    cy.url().should('equal', baseUrl);
  });

  it("Shouldn't contain a button opening/closing the menus popup", () => {
    cy.get('div[id="dynamicMenuPopUp"]')
      .should('have.class', 'slideOut')
      .should('have.css', 'width', '0px');
    cy.get('nav')
      .find('button[name="hamburgerMenu"]')
      .should('have.css', 'display', 'none');
  });

  it('Should contain the desktopMenu', () => {
    cy.get('div[id="desktopMenu"]').should('have.css', 'display', 'flex');
  });

  it('Should contain a link redirecting the the menus page', () => {
    cy.get('div[id="desktopMenu"]').find('a[href="/les-menus"]').click();
    cy.url().should('equal', baseUrl + 'les-menus');
  });

  it('Should contain a link redirecting the the Carte page', () => {
    cy.get('div[id="desktopMenu"]').find('a[href="/la-carte"]').click();
    cy.url().should('equal', baseUrl + 'la-carte');
  });

  it('Should contain a link redirecting the the Connexion page', () => {
    cy.get('div[id="desktopMenu"]').find('a[href="/connexion"]').click();
    cy.url().should('equal', baseUrl + 'connexion');
  });

  it('Should contain a link redirecting the the Reserver page', () => {
    cy.get('div[id="desktopMenu"]').find('a[href="/reserver"]').click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

describe('Dishes Gallery Section Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
  });

  it('images should have a title and alt', () => {
    cy.get('section[id="galleryDishesSection"]')
      .find('img')
      .each(($image) => {
        const images = Array.from($image);
        for (const image of images) {
          expect(image.title).to.not.be.empty;
          expect((image as HTMLImageElement).alt).to.not.be.empty;
        }
      });
  });

  it('should contain a link redirecting to /les-menus', () => {
    cy.get('section[id="galleryDishesSection"]')
      .find('a[href="/les-menus"]')
      .click();
    cy.url().should('equal', baseUrl + 'les-menus');
  });

  it('should contain a link redirecting to /la-carte', () => {
    cy.get('section[id="galleryDishesSection"]')
      .find('a[href="/la-carte"]')
      .click();
    cy.url().should('equal', baseUrl + 'la-carte');
  });
});

describe('Dishes Gallery Section Desktop', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
  });

  it('images should have a title and alt', () => {
    cy.get('section[id="galleryDishesSection"]')
      .find('img')
      .each(($image) => {
        const images = Array.from($image);
        for (const image of images) {
          expect(image.title).to.not.be.empty;
          expect((image as HTMLImageElement).alt).to.not.be.empty;
        }
      });
  });

  it('should contain a link redirecting to /les-menus', () => {
    cy.get('section[id="galleryDishesSection"]')
      .find('a[href="/les-menus"]')
      .click();
    cy.url().should('equal', baseUrl + 'les-menus');
  });

  it('should contain a link redirecting to /la-carte', () => {
    cy.get('section[id="galleryDishesSection"]')
      .find('a[href="/la-carte"]')
      .click();
    cy.url().should('equal', baseUrl + 'la-carte');
  });
});

describe('Reservation Section mobile', () => {
  it('should contain a link redirecting to /reserver', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('section[id="reservationSection"]')
      .find('a[href="/reserver"]')
      .click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

describe('Reservation Section desktop', () => {
  it('should contain a link redirecting to /reserver', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('section[id="reservationSection"]')
      .find('a[href="/reserver"]')
      .click();
    cy.url().should('equal', baseUrl + 'reserver');
  });
});

describe('Subscribe Section mobile', () => {
  it('should contain a link redirecting to /inscription', () => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
    cy.get('section[id="subscribeSection"]')
      .find('a[href="/inscription"]')
      .click();
    cy.url().should('equal', baseUrl + 'inscription');
  });
});

describe('Subscribe Section desktop', () => {
  it('should contain a link redirecting to /inscription', () => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
    cy.get('section[id="subscribeSection"]')
      .find('a[href="/inscription"]')
      .click();
    cy.url().should('equal', baseUrl + 'inscription');
  });
});

export default describe;
