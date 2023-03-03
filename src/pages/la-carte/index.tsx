import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import Hero from '@/components/Hero/Hero';
import CarteCategory from '@/components/Sections/Carte/CarteCategory';
import { CarteCategoryData } from '@/interfaces/carte';
import React from 'react';
import ChefsQuote from './ChefsQuote';

const CartePage = ({ carteDishes }: { carteDishes: CarteCategoryData[] }) => {
  return (
    <>
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
      {carteDishes.map((categoryContent: CarteCategoryData, index: number) => {
        let totalCardIndex = 0;
        for (let i = 0; i < index; i++) {
          totalCardIndex += carteDishes[i].dishes.length;
        }
        return (
          <React.Fragment key={index}>
            <CarteCategory
              categoryContent={categoryContent}
              startIndex={totalCardIndex}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export const getStaticProps = async () => {
  const carteDishesResponse = await getDataFromAPI(
    API_ROUTES.dishes.getAllDishesByCategories
  );
  const carteDishes = carteDishesResponse?.rows;
  return {
    props: {
      carteDishes,
    },
  };
};

export default CartePage;
