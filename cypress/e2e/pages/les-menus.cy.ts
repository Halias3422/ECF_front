const baseUrl = 'http://localhost:3000/les-menus';

describe('Menus on Mobile', () => {
  let $menuItems: JQuery<HTMLElement>[] = [];
  let $menusFormulas: JQuery<HTMLElement>[] = [];

  before(() => {
    cy.visit(baseUrl);
    cy.get('section[id="menusSection"]')
      .find('article')
      .each(($menu) => {
        $menuItems.push($menu);
        cy.wrap($menu)
          .get('div[id*="formula"]')
          .each(($formula) => {
            $menusFormulas.push($formula);
          });
      });
  });

  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
  });

  it('should contain at least one menu', () => {
    cy.get('section[id="menusSection"]').find('article');
  });

  it('every menu should have a title', () => {
    for (const $menu of $menuItems) {
      expect($menu.html()).contains('<h2');
    }
  });

  it('every menu should have at least one formula', () => {
    for (const $menu of $menuItems) {
      expect($menu.html()).contains('<div');
    }
  });

  it('every formula should have a title', () => {
    for (const $formula of $menusFormulas) {
      expect($formula.html()).contains('<h3');
    }
  });

  it('every formula should have a description', () => {
    for (const $formula of $menusFormulas) {
      expect($formula.html()).contains('<p');
    }
  });

  it('every formula should have a price', () => {
    for (const $formula of $menusFormulas) {
      expect($formula.html()).contains('themeDarkBlue');
    }
  });
});

describe('Menus on Desktop', () => {
  let $menuItems: JQuery<HTMLElement>[] = [];
  let $menusFormulas: JQuery<HTMLElement>[] = [];

  before(() => {
    cy.visit(baseUrl);
    cy.get('section[id="menusSection"]')
      .find('article')
      .each(($menu) => {
        $menuItems.push($menu);
        cy.wrap($menu)
          .get('div[id*="formula"]')
          .each(($formula) => {
            $menusFormulas.push($formula);
          });
      });
  });

  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
  });

  it('should contain at least one menu', () => {
    cy.get('section[id="menusSection"]').find('article');
  });

  it('every menu should have a title', () => {
    for (const $menu of $menuItems) {
      expect($menu.html()).contains('<h2');
    }
  });

  it('every menu should have at least one formula', () => {
    for (const $menu of $menuItems) {
      expect($menu.html()).contains('<div');
    }
  });

  it('every formula should have a title', () => {
    for (const $formula of $menusFormulas) {
      expect($formula.html()).contains('<h3');
    }
  });

  it('every formula should have a description', () => {
    for (const $formula of $menusFormulas) {
      expect($formula.html()).contains('<p');
    }
  });

  it('every formula should have a price', () => {
    for (const $formula of $menusFormulas) {
      expect($formula.html()).contains('themeDarkBlue');
    }
  });
});

export default describe;
