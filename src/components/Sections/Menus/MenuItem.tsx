import { Menu } from '@/interfaces/menus';
import { merriweatherSans } from '@/styles/fonts';
import styled from 'styled-components';
import FormulaItem from './FormulaItem';

const MenuItem = ({ menu, index }: { menu: Menu; index: number }) => {
  const theme = index % 2 === 0 ? 'themeDarkGreen' : 'themeLightGreen';

  return (
    <MenuItemContainer>
      <TitleContainer className={theme}>
        <MenuTitle className={merriweatherSans.className}>
          {menu.title}
        </MenuTitle>
      </TitleContainer>
      <FormulasContainer>
        {menu.formulas.map((formula, index) => {
          return <FormulaItem formula={formula} key={index} />;
        })}
      </FormulasContainer>
    </MenuItemContainer>
  );
};

export const MenuItemContainer = styled.article`
  margin-bottom: 40px;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  @media screen and (min-width: 769px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (min-width: 1025px) {
    width: 45%;
    min-height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px;
    margin-bottom: 80px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
`;

export const MenuTitle = styled.h2`
  margin-bottom: 0px;
`;

export const FormulasContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.snow};
  color: ${(props) => props.theme.darkGrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  height: 100%;
`;

export default MenuItem;
