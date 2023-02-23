import styled from 'styled-components';
import NavbarLink from './NavbarLink';

const DesktopMenu = () => {
  return (
    <DesktopMenuContainer>
      <GreenLinksContainer>
        <MenuLinkSeparator>
          <NavbarLink
            textContent="Menus"
            url="/les-menus"
            className="themeLightGreen"
          />
          <NavbarLink
            textContent="Carte"
            url="'/la-carte"
            className="themeLightGreen"
          />
        </MenuLinkSeparator>
        <MenuLinkSeparator>
          <NavbarLink
            textContent="Contact"
            url="/contact"
            className="themeLightGreen"
          />
          <NavbarLink
            textContent="Connexion"
            url="/connexion"
            className="themeLightGreen"
          />
        </MenuLinkSeparator>
      </GreenLinksContainer>
      <NavbarLink
        textContent="Réserver"
        url="/reserver"
        className="themeDarkGrey"
      />
    </DesktopMenuContainer>
  );
};

const DesktopMenuContainer = styled.div`
  display: none;
  @media screen and (min-width: 1025px) {
    display: flex;
    width: 70%;
    justify-content: right;
    gap: 5%;
  }
`;

const MenuLinkSeparator = styled.div`
  display: flex;
  gap: 5%;
`;

const GreenLinksContainer = styled.div`
  display: flex;
  gap: 5%;
  justify-content: space-evenly;
`;

export default DesktopMenu;
