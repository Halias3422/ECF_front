const baseUrl = 'http://localhost:3000/la-carte';

describe('La Carte on mobile', () => {
  let $carteCategories: JQuery<HTMLElement>[] = [];
  let $carteDishes: JQuery<HTMLElement>[] = [];
  let $priceTags: JQuery<HTMLElement>[] = [];
  let $dishImages: JQuery<HTMLElement>[] = [];

  before(() => {
    cy.visit(baseUrl);
    cy.get('article[class*="CarteCategory"]').each(($category) => {
      $carteCategories.push($category);
    });
    cy.get('article[class*="CarteDishItem"]').each(($dish) => {
      $carteDishes.push($dish);
      cy.wrap($dish)
        .get('p[class*="PriceTag"]')
        .each(($priceTag) => {
          $priceTags.push($priceTag);
        });
      cy.wrap($dish)
        .get('img[class*="image"]')
        .each(($dishImage) => {
          $dishImages.push($dishImage);
        });
    });
  });

  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit(baseUrl);
  });

  it('each category should have a title', () => {
    for (const $category of $carteCategories) {
      expect($category.html()).contains('<h2');
      cy.wrap($category)
        .get('h2')
        .each(($title) => {
          expect($title.text()).to.have.length.gt(0);
        });
    }
  });

  it('each dishCard should have a priceTag, a title, a desription and an image', () => {
    for (const $dish of $carteDishes) {
      expect($dish.html()).to.contain('<div class="PriceTag');
      const dish = cy.wrap($dish);
      dish.get('h3[class*="dishTitle"]').each(($title) => {
        expect($title.text()).to.have.length.gt(0);
      });
      dish.get('p[class*="dishDescription"]').each(($description) => {
        expect($description.text()).to.have.length.gt(0);
      });
      expect($dish.html()).to.contain('<img');
    }
  });

  it('each priceTag should have a price in euros', () => {
    for (const $priceTag of $priceTags) {
      expect($priceTag.text()).to.have.length.gt(0);
      expect($priceTag.text()).contains('€');
    }
  });

  it('each dishImage should have a source and alt attributes', () => {
    for (const $image of $dishImages) {
      expect($image.attr('src')).to.have.length.gt(0);
      expect($image.attr('alt')).to.have.length.gt(0);
    }
  });
});

describe('La Carte on desktop', () => {
  let $carteCategories: JQuery<HTMLElement>[] = [];
  let $carteDishes: JQuery<HTMLElement>[] = [];
  let $priceTags: JQuery<HTMLElement>[] = [];
  let $dishImages: JQuery<HTMLElement>[] = [];

  before(() => {
    cy.visit(baseUrl);
    cy.get('article[class*="CarteCategory"]').each(($category) => {
      $carteCategories.push($category);
    });
    cy.get('article[class*="CarteDishItem"]').each(($dish) => {
      $carteDishes.push($dish);
      cy.wrap($dish)
        .get('p[class*="PriceTag"]')
        .each(($priceTag) => {
          $priceTags.push($priceTag);
        });
      cy.wrap($dish)
        .get('img[class*="image"]')
        .each(($dishImage) => {
          $dishImages.push($dishImage);
        });
    });
  });

  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit(baseUrl);
  });

  it('each category should have a title', () => {
    for (const $category of $carteCategories) {
      expect($category.html()).contains('<h2');
      cy.wrap($category)
        .get('h2')
        .each(($title) => {
          expect($title.text()).to.have.length.gt(0);
        });
    }
  });

  it('each dishCard should have a priceTag, a title, a desription and an image', () => {
    for (const $dish of $carteDishes) {
      expect($dish.html()).to.contain('<div class="PriceTag');
      const dish = cy.wrap($dish);
      dish.get('h3[class*="dishTitle"]').each(($title) => {
        expect($title.text()).to.have.length.gt(0);
      });
      dish.get('p[class*="dishDescription"]').each(($description) => {
        expect($description.text()).to.have.length.gt(0);
      });
      expect($dish.html()).to.contain('<img');
    }
  });

  it('each priceTag should have a price in euros', () => {
    for (const $priceTag of $priceTags) {
      expect($priceTag.text()).to.have.length.gt(0);
      expect($priceTag.text()).contains('€');
    }
  });

  it('each dishImage should have a source and alt attributes', () => {
    for (const $image of $dishImages) {
      expect($image.attr('src')).to.have.length.gt(0);
      expect($image.attr('alt')).to.have.length.gt(0);
    }
  });
});

export default describe;
