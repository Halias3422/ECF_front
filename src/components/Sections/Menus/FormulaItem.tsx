import { Formula } from '@/interfaces/formulas';
import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';

const FormulaItem = ({ formula, id }: { formula: Formula; id: string }) => {
  return (
    <FormulaItemContainer id={id}>
      <h3 className={merriweatherSans.className}>{formula.title}</h3>
      <p>{formula.description}</p>
      <FormulaPrice className="themeDarkBlue">{`${formula.price} €`}</FormulaPrice>
    </FormulaItemContainer>
  );
};

const FormulaItemContainer = styled.div`
  overflow-wrap: anywhere;
  p {
    text-align: center;
  }
  padding-bottom: 20px;
`;

const FormulaPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  border-radius: 16px;
  padding: 15px;

  @media screen and (min-width: 1025px) {
    font-size: 22px;
  }
`;

export default FormulaItem;
