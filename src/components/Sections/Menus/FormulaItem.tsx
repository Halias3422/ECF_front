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
    white-space: pre-wrap;
  }
  padding-bottom: 40px;
  max-width: 90%;
`;

const FormulaPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  border-radius: 16px;
  padding: 15px;
  max-width: 50%;
  min-width: fit-content;
  margin: 0 auto;
  @media screen and (min-width: 1025px) {
    font-size: 22px;
  }
`;

export default FormulaItem;
