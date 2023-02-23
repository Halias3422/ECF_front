import { dancingScript } from '@/styles/fonts';
import styled from 'styled-components';
import HamburgerMenu from '../svg/HamburgerMenu';
import NavbarGreenLink from './NavbarGreenLink';

const Navbar = () => {
  return (
    <NavbarSection className="section">
      <NavbarContainer className="container">
        <LogoContainer href="/" className={`${dancingScript.className}`}>
          Le Quai Antique
        </LogoContainer>
        <HamburgerMenu />
        <DesktopMenu>
          <MenuLinkSeparator>
            <NavbarGreenLink textContent="Les Menus" url="/les-menus" />
            <NavbarGreenLink textContent="La Carte" url="'/la-carte" />
          </MenuLinkSeparator>
          <MenuLinkSeparator>
            <NavbarGreenLink textContent="Contact" url="/contact" />
            <NavbarGreenLink textContent="Connexion" url="/connexion" />
          </MenuLinkSeparator>
          <NavbarGreenLink textContent="Réserver" url="/reserver" />
        </DesktopMenu>
      </NavbarContainer>
    </NavbarSection>
  );
};

const NavbarSection = styled.div`
  background-color: ${(props) => props.theme.darkGreen};
  height: 50px;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.a`
  font-weight: 700;
  color: ${(props) => props.theme.snow};
  font-size: 28px;
  @media screen and (min-width: 481px) {
    font-size: 30px;
  }
  @media screen and (min-width: 769px) {
    font-size: 32px;
  }
  @media screen and (min-width: 1025px) {
    font-size: 36px;
  }
  @media screen and (min-width: 1201px) {
    font-size: 42px;
  }
`;

//hide buttons for smaller displays
const DesktopMenu = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 50%;
  align-items: center;

  @media screen and (max-width: 1025px) {
    display: none;
  }
`;

const MenuLinkSeparator = styled.div`
  height: 100%;
  gap: 0.5rem;
  display: flex;
`;

export default Navbar;
