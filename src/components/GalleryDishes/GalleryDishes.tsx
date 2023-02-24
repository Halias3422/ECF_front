import { GalleryDishData } from '@/interfaces/dishes';
import { merriweatherSans } from '@/styles/fonts';
import React, { useEffect } from 'react';
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
    <article className={`section ${$isOdd ? 'odd' : 'even'}`}>
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
      </GalleryDishesContainer>
    </article>
  );
};

const GalleryDishesContainer = styled.div``;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  @media screen and (min-width: 769px) {
     {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
`;

export default GalleryDishes;
