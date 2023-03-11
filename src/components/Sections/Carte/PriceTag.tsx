import styled from 'styled-components';

const PriceTag = ({ price, $isOdd }: { price: string; $isOdd: boolean }) => {
  return (
    <PriceTagContainer $isOdd={$isOdd}>
      <BackgroundContainer className="themeDarkBlue" $isOdd={$isOdd}>
        <PriceHolder>{price}€</PriceHolder>
        <TagBorders>
          <TagTriangle $isOdd={$isOdd} />
        </TagBorders>
      </BackgroundContainer>
    </PriceTagContainer>
  );
};

const PriceTagContainer = styled.div<{ $isOdd: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isOdd ? 'flex-end' : 'flex-start')};
  @media screen and (min-width: 1025px) {
    width: fit-content;
  }
`;

const BackgroundContainer = styled.div<{ $isOdd: boolean }>`
  width: fit-content;
  height: 100%;
  ${(props) => (props.$isOdd ? 'margin-right: 10%;' : 'margin-left: 10%;')}
  @media screen and (min-width: 1025px) {
    display: flex;
    flex-direction: ${(props) => (props.$isOdd ? 'row-reverse' : 'row')};
    align-items: center;
    margin: 0;
    margin-top: 62px;
  }
`;

const PriceHolder = styled.p`
  font-size: 28px;
  padding: 15px 5px;
  margin: 0;
  @media screen and (min-width: 1025px) {
    padding: 20px 20px;
    font-size: 46px;
  }
`;

const TagBorders = styled.div`
  height: 52px;
  background: ${(props) => props.theme.darkBlue};
  overflow: hidden;
  @media screen and (min-width: 1025px) {
    width: 52px;
    height: 95px;
  }
`;

const TagTriangle = styled.div<{ $isOdd: boolean }>`
  margin: 0 auto;
  width: 71%;
  margin-top: 18px;
  padding-bottom: 71%;
  transform: rotate(45deg);
  background-color: ${(props) => props.theme.snow};
  @media screen and (min-width: 1025px) {
    width: 129%;
    padding-bottom: 129%;
    margin-top: 14px;
    float: left;
    margin-left: ${(props) => (props.$isOdd ? '-34px' : '18px')};
  }
`;

export default PriceTag;
