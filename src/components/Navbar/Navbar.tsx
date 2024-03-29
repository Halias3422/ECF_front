import UserContext from '@/context/UserContext';
import { dancingScript } from '@/styles/fonts';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DesktopMenu from './DesktopMenu';
import DynamicMobileMenu from './DynamicMobileMenu';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { userContext } = useContext(UserContext);

  const handleResize = () => {
    if (window.screen.width > 1024) {
      setHamburgerOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Header>
      <NavbarSection>
        <NavbarContainer>
          <LogoContainer
            href="/"
            className={`${dancingScript.className}`}
            role="button"
          >
            Le Quai Antique
          </LogoContainer>
          <HamburgerMenu
            hamburgerOpen={hamburgerOpen}
            setHamburgerOpen={setHamburgerOpen}
          />
          <DesktopMenu userContext={userContext} />
        </NavbarContainer>
      </NavbarSection>
      <DynamicMobileMenu
        hamburgerOpen={hamburgerOpen}
        setHamburgerOpen={setHamburgerOpen}
        userContext={userContext}
      />
    </Header>
  );
};

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavbarSection = styled.nav`
  background-color: ${(props) => props.theme.darkGreen};
  min-height: 50px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`;

const NavbarContainer = styled.div`
  width: 80%;
  min-width: 230px;
  max-width: 1400px;
  margin: 0 auto;
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
