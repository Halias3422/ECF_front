import Hero from '@/components/Hero/Hero';
import ChefsQuote from './ChefsQuote';

const CartePage = () => {
  return (
    <Hero
      header="Découvrez <b>la Carte</b> du Quai Antique"
      paragraphs={[
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis dis parturient montes.',
      ]}
      childComponents={[
        <ChefsQuote quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit porta." />,
      ]}
      image={'images/table-full-meals.jpg'}
      imageAlt={'Assortiment de plats concoctés par le Chef'}
      $isOdd
      $textIsLeft={false}
    />
  );
};

export default CartePage;
