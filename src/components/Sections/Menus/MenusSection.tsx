import { Menu } from '@/interfaces/menus';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const MenusSection = ({
  menus,
  $isOdd,
}: {
  menus: Menu[];
  $isOdd: boolean;
}) => {
  return (
    <section id="menusSection" className={`section ${$isOdd ? 'odd' : 'even'}`}>
      <MenusContainer className="container">
        {menus.map((menu, index) => {
          return <MenuItem menu={menu} index={index} key={index} />;
        })}
      </MenusContainer>
    </section>
  );
};

const MenusContainer = styled.div`
  @media screen and (min-width: 1025px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;

export default MenusSection;
