import { DishCarteData } from '@/interfaces/dishes';
import Image from 'next/image';
import styled from 'styled-components';
import PriceTag from './PriceTag';

const CarteDishItem = ({
  dish,
  $isOdd,
}: {
  dish: DishCarteData;
  $isOdd: boolean;
}) => {
  return (
    <RowContainer $isOdd={$isOdd}>
      <DishItemContainer $isOdd={$isOdd}>
        <PriceTag price={dish.price.toString().slice(0, 5)} $isOdd={$isOdd} />
        <DishCardContainer
          $isOdd={$isOdd}
          className={
            'dishCardContainer ' +
            ($isOdd ? 'themeDarkGreen' : 'themeLightGreen')
          }
        >
          <TextContainer>
            <HeaderContainer
              $isOdd={$isOdd}
              className={$isOdd ? 'themeLightGreen' : 'themeDarkGreen'}
            >
              <h3 className="dishTitle">{dish.title}</h3>
            </HeaderContainer>
            <p className="dishDescription">{dish.description}</p>
          </TextContainer>
          <ImageContainer className="imageContainer" $isOdd={$isOdd}>
            <Image
              loading="lazy"
              fill
              className="image"
              id={`image${dish.image}`}
              src={
                `${process.env.NEXT_PUBLIC_AWS_URL}/dishes/DISHES_` + dish.image
              }
              alt={dish.title}
              sizes="(max-width: 1024px) 100%,
										50%"
            />
          </ImageContainer>
        </DishCardContainer>
      </DishItemContainer>
    </RowContainer>
  );
};

const RowContainer = styled.div<{ $isOdd: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.$isOdd ? 'flex-end' : 'flex-start')};
`;

const EmptyDiv = styled.div`
  width: 20%;
`;

const DishItemContainer = styled.article<{ $isOdd: boolean }>`
  display: flex;
  flex-direction: column-reverse;
  align-items: ${(props) => (props.$isOdd ? 'flex-end' : 'flex-start')};
  margin-bottom: 42px;
  @media screen and (min-width: 1025px) {
    width: 80%;
    display: flex;
    flex-direction: ${(props) => (props.$isOdd ? 'row' : 'row-reverse')};
    align-items: flex-start;
    margin-bottom: 60px;
  }
`;

const DishCardContainer = styled.div<{ $isOdd: boolean }>`
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 481px) {
    width: 65%;
  }
  @media screen and (min-width: 1025px) {
    background: ${(props) =>
      props.$isOdd
        ? `linear-gradient(${props.theme.lightGreen} 0 25%, ${props.theme.darkGreen} 25% 100%)`
        : `linear-gradient(${props.theme.darkGreen} 0 25%, ${props.theme.lightGreen} 25% 100%)`};
    border-radius: 8px;
    width: 90%;
    flex-direction: ${(props) => (props.$isOdd ? 'row' : 'row-reverse')};
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  p {
    margin: 30px 10%;
  }
  @media screen and (min-width: 1025px) {
    width: 50%;
    text-align: justify;
  }
`;

const HeaderContainer = styled.div<{ $isOdd: boolean }>`
  padding: 10%;
  h3 {
    margin: 0px;
    text-align: start;
    overflow-wrap: break-word;
    width: 82%;
  }
  @media screen and (min-width: 1025px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div<{ $isOdd: boolean }>`
  width: 94%;
  margin-bottom: 2%;
  @media screen and (min-width: 1025px) {
    ${(props) => (props.$isOdd ? `float: right;` : `float: left;`)};
    width: 50%;
    object-fit: contain;
    max-height: 610px;
    margin: ${(props) => (props.$isOdd ? '0.4vw' : '0.4vw 0px 0.4vw 0.4vw')};
    z-index: 1;
  }
`;

export default CarteDishItem;
