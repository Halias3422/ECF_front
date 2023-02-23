import { dancingScript } from '@/styles/fonts';
import styled from 'styled-components';
import DesktopMenu from './DesktopMenu';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
  return (
    <NavbarSection className="section">
      <NavbarContainer className="container">
        <LogoContainer href="/" className={`${dancingScript.className}`}>
          Le Quai Antique
        </LogoContainer>
        <HamburgerMenu />
        <DesktopMenu />
      </NavbarContainer>
    </NavbarSection>
  );
};

const NavbarSection = styled.div`
  background-color: ${(props) => props.theme.darkGreen};
  min-height: 50px;
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

export default Navbar;
