import { DishCarteData } from '@/interfaces/dishes';
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
    <DishItemContainer $isOdd={$isOdd} className="cardDishItem">
      <PriceTag price={dish.price.toString().slice(0, 5)} $isOdd={$isOdd} />
      <DishCardContainer
        className={$isOdd ? 'themeDarkGreen' : 'themeLightGreen'}
        $isOdd={$isOdd}
      >
        <DishImage
          id={`image${dish.image}`}
          src={`dishes/${dish.image}`}
          alt={dish.title}
        />
        <DishTextContainer>
          <HeaderContainer
            className={$isOdd ? 'themeLightGreen' : 'themeDarkGreen'}
          >
            <h3 className="dishTitle">{dish.title}</h3>
          </HeaderContainer>
          <p className="dishDescription">{dish.description}</p>
        </DishTextContainer>
      </DishCardContainer>
    </DishItemContainer>
  );
};

const DishItemContainer = styled.article<{ $isOdd: boolean }>`
  display: flex;
  flex-direction: column-reverse;
  align-items: ${(props) => (props.$isOdd ? 'flex-end' : 'flex-start')};
  margin-bottom: 42px;
  @media screen and (min-width: 1025px) {
    width: 100%;
    flex-direction: ${(props) => (props.$isOdd ? 'row' : 'row-reverse')};
    justify-content: ${(props) => (props.$isOdd ? 'flex-end' : 'flex-start')};
    align-items: flex-start;
  }
`;

const DishCardContainer = styled.div<{ $isOdd: boolean }>`
  border-radius: 8px;
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  overflow: hidden;
  @media screen and (min-width: 481px) {
    width: 65%;
  }
  @media screen and (min-width: 1025px) {
    width: 80%;
    position: relative;
    display: flex;
    background-position: 25% 25%;
    flex-direction: ${(props) => (props.$isOdd ? 'row-reverse' : 'row')};
    min-height: 420px;
    border-radius: 12px;
  }
`;

//vertical-align to get rid of space between h3 and img
const DishImage = styled.img`
  vertical-align: bottom;
  border-radius: 0px;
  @media screen and (min-width: 1025px) {
    position: absolute;
    right: 1vw;
    top: 50%;
    transform: translate(0, -50%);
    width: 400px;
    height: 400px;
    max-width: none;
  }
`;

const DishTextContainer = styled.div`
  h3,
  p {
    text-align: center;
  }
  h3 {
    padding: 18px 5px;
  }
  @media screen and (min-width: 1025px) {
    width: 100%;
    p {
      padding: 50px 2vw;
    }
    p,
    h3 {
      margin: 0px;
      width: 35%;
      text-align: left;
    }
  }
`;

const HeaderContainer = styled.div`
  @media screen and (min-width: 1025px) {
    padding: 20px 2vw;
    width: 100%;
  }
`;
/*
const DishItemContainer = styled.article<{ $isOdd: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.$isOdd ? 'row' : 'row-reverse')};
  justify-content: ${(props) => (props.$isOdd ? 'flex-end' : 'flex-start')};
`;

const PriceTag = styled.p`
  height: fit-content;
  padding: 20px;
  margin-top: 50px;
`;

const DishCardContainer = styled.div<{ $isOdd: boolean }>`
  width: 80%;
  position: relative;
  display: flex;
  background-position: 25% 25%;
  flex-direction: ${(props) => (props.$isOdd ? 'row-reverse' : 'row')};
  min-height: 540px;
  border-radius: 12px;
  overflow: hidden;
  @media screen and (min-width: 1025px) {
    min-height: 420px;
  }
  @media screen and (min-width: 1200px) {
    min-height: 540px;
  }
`;

// right: 1%;
// top: 1vh;
const DishImage = styled.img`
  position: absolute;
  right: 1vw;
  top: 50%;
  transform: translate(0, -50%);
  width: 520px;
  height: 520px;
  max-width: none;
  @media screen and (min-width: 1025px) {
    width: 400px;
    height: 400px;
  }
  @media screen and (min-width: 1200px) {
    width: 520px;
    height: 520px;
  }
`;

const DishTextContainer = styled.div`
  width: 100%;
  p {
    padding: 50px 2vw;
  }
  p,
  h3 {
    margin: 0px;
    width: 35%;
  }
`;

const HeaderContainer = styled.div`
  padding: 20px 2vw;
  width: 100%;
`;
*/

export default CarteDishItem;
