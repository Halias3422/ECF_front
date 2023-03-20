import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import ChefsQuote from '@/components/ChefsQuote/ChefsQuote';
import Hero from '@/components/Hero/Hero';
import CarteCategory from '@/components/Sections/Carte/CarteCategory';
import Footer from '@/components/Sections/Footer/Footer';
import LoadingAnim from '@/components/svgs/loadingAnim';
import { CarteCategoryData } from '@/interfaces/carte';
import { DaySchedule } from '@/interfaces/schedule';
import Head from 'next/head';
import React from 'react';

const CartePage = ({
  carteDishes,
  weekSchedule,
}: {
  carteDishes: CarteCategoryData[];
  weekSchedule: DaySchedule[];
}) => {
  return (
    <>
      <Head>
        <title>La Carte du restaurant</title>
        <meta
          name="description"
          content="Découvrez les plats concoctés avec soin et expérience par le Chef Arnaud Michant et son équipe."
        />
      </Head>
      <main>
        <Hero
          header="Découvrez <b>la Carte</b> du Quai Antique"
          paragraphs={[
            "Chacun de nos plats est le résultat du fruit de trente années d'expérimentation culinaire. La cuisine d'hier n'a jamais été meilleure qu'aujourd'hui !",
          ]}
          childComponents={[
            <ChefsQuote quote="Mon ambition est de faire découvrir à toutes et tous les richesses du terroir savoyard en les mettant en valeur par l'innovation, tout en respectant le savoir transmis par nos anciens." />,
          ]}
          image="table-full-meals.webp"
          imageAlt={'Assortiment de plats concoctés par le Chef'}
          $isOdd
          $textIsLeft={false}
        />
        {!carteDishes ? (
          <LoadingAnim />
        ) : (
          carteDishes.length > 0 &&
          carteDishes.map(
            (categoryContent: CarteCategoryData, index: number) => {
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
            }
          )
        )}
      </main>
      <Footer weekSchedule={weekSchedule} />
    </>
  );
};

export const getStaticProps = async () => {
  const carteDishesResponse = await getDataFromAPI(
    API_ROUTES.dishes.getAllDishesByCategories
  );
  const carteDishes = carteDishesResponse?.data || null;

  const scheduleResponse = await getDataFromAPI(
    API_ROUTES.schedule.getWeekSchedule
  );
  const weekSchedule = scheduleResponse?.data || null;
  return {
    props: {
      carteDishes,
      weekSchedule,
    },
  };
};

export default CartePage;
