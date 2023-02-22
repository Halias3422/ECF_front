import { dancingScript } from '@/styles/fonts';
import styled from 'styled-components';
import HamburgerMenu from '../svg/HamburgerMenu';

const Navbar = () => {
  return (
    <NavbarContainer>
      <LogoContainer href="/" className={`${dancingScript.className} logo`}>
        Le Quai Antique
      </LogoContainer>
      <HamburgerMenu />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  background-color: ${(props) => props.theme.darkGreen};
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.a`
  font-weight: 700;
  color: ${(props) => props.theme.snow};
  font-size: 28px;
`;

export default Navbar;
