import MainCTA from '@/components/MainCTA/MainCTA';
import { GalleryDishData } from '@/interfaces/dishes';
import colorscheme from '@/styles/colorscheme';
import { merriweatherSans } from '@/styles/fonts';
import React from 'react';
import styled from 'styled-components';
import GalleryDishItem from './GalleryDishItem';

const GalleryDishes = ({
  $isOdd,
  galleryDishes,
}: {
  $isOdd: boolean;
  galleryDishes: GalleryDishData[];
}) => {
  return (
    <section
      id="galleryDishesSection"
      className={`section ${$isOdd ? 'odd' : 'even'}`}
    >
      <GalleryDishesContainer id="galleryDishesContainer" className="container">
        <h2 className={merriweatherSans.className}>Les bons plats du Chef</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ante
          pharetra nisl suscipit porta. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit
          amet, consectetur
        </p>
        <p>
          consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit{' '}
        </p>
        <ImagesContainer>
          {galleryDishes?.map((dish: GalleryDishData, index: number) => {
            return (
              <React.Fragment key={index}>
                <GalleryDishItem dish={dish} />
              </React.Fragment>
            );
          })}
        </ImagesContainer>
        <ForMoreDishes>
          consectetur adipiscing elit. Morbi at ante pharetra nisl suscipit
          adipiscing elit. Morbi at ante pharetra nisl
        </ForMoreDishes>
        <MoreDishesCTAContainer>
          <MainCTA
            textContent="Nos Menus"
            url="/les-menus"
            theme="themeDarkGreen"
          />
          <MainCTA
            textContent="La Carte"
            url="/la-carte"
            theme="themeLightGreen"
          />
        </MoreDishesCTAContainer>
      </GalleryDishesContainer>
    </section>
  );
};

const GalleryDishesContainer = styled.div``;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  @media screen and (min-width: 769px) {
    margin: 70px 0 30px 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  @media screen and (min-width: 1025px) {
    margin: 90px 0 50px 0;
  }
`;

const ForMoreDishes = styled.p`
  margin: 0 auto;
  text-align: center;
  @media screen and (min-width: 769px) {
    line-height: 1.5;
    max-width: 80%;
  }
  @media screen and (min-width: 1025px) {
    max-width: 65%;
  }
`;

const MoreDishesCTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  @media screen and (min-width: 769px) {
    margin-top: 60px;
    flex-direction: row;
    gap: 5%;
    justify-content: center;
  }
`;

export default GalleryDishes;
