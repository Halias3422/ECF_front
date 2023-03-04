import { CarteCategoryData } from '@/interfaces/carte';
import React from 'react';
import styled from 'styled-components';
import CarteDishItem from './CarteDishItem';

const CarteCategory = ({
  categoryContent,
  startIndex,
}: {
  categoryContent: CarteCategoryData;
  startIndex: number;
}) => {
  return (
    <>
      <section className="section even">
        <CategoryNameContainer className="container">
          <h2>{categoryContent.category.name}</h2>
        </CategoryNameContainer>
      </section>
      <section className="section odd">
        <div className="container">
          {categoryContent.dishes.map((dish, index) => {
            return (
              <React.Fragment key={index}>
                <CarteDishItem
                  dish={dish}
                  $isOdd={(startIndex + index) % 2 === 0}
                />
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};

const CategoryNameContainer = styled.article`
  display: flex;
  justify-content: center;
  h2 {
    margin-bottom: 0px;
  }
`;

export default CarteCategory;
