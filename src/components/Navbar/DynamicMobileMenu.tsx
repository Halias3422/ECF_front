import styled from 'styled-components';
import DesktopMenu from './DesktopMenu';
import NavbarLink from './NavbarLink';

const DynamicMobileMenu = ({ hamburgerOpen }: { hamburgerOpen: boolean }) => {
  return (
    <DynamicMenuPopUp className={hamburgerOpen ? 'slideIn' : 'slideOut'}>
      <MenuColumns>
        <NavbarLink
          textContent="Menus"
          url="/les-menus"
          className="themeDarkGreen"
        />
        <NavbarLink
          textContent="Carte"
          url="'/la-carte"
          className="themeDarkGreen"
        />
        <NavbarLink
          textContent="Contact"
          url="/contact"
          className="themeDarkGreen"
        />
        <NavbarLink
          textContent="Connexion"
          url="/connexion"
          className="themeDarkGreen"
        />
        <NavbarLink
          textContent="Réserver"
          url="/reserver"
          className="themeDarkGrey"
        />
      </MenuColumns>
    </DynamicMenuPopUp>
  );
};

const DynamicMenuPopUp = styled.div`
  float: right;
  overflow-x: none;
  width: 0%;
  height: fit-content;
  padding-top: 2px;
  padding-bottom: 2px;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.darkGreen};
  padding-top: 20px;
  padding-bottom: 20px;
  transition: width ease-out 0.5s;
  border: ${(props) => props.theme.lightGreen} 2px solid;
  &.slideIn {
    width: 50%;
    @media screen and (max-width: 481px) {
      width: 100%;
    }
  }
  &.slideOut {
    width: 0%;
    border-left: none;
    border-right: none;
  }
`;

const MenuColumns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-x: none;
`;
export default DynamicMobileMenu;
