import { UserLoginState } from '@/interfaces/users';
import styled from 'styled-components';
import AccountButton from './AccountButton';
import NavbarLink from './NavbarLink';

const DesktopMenu = ({ userContext }: { userContext: UserLoginState }) => {
  return (
    <DesktopMenuContainer id="desktopMenu">
      <GreenLinksContainer>
        <MenuLinkSeparator>
          <NavbarLink
            textContent="Menus"
            url="/les-menus"
            theme="themeLightGreen"
          />
          <NavbarLink
            textContent="Carte"
            url="/la-carte"
            theme="themeLightGreen"
          />
        </MenuLinkSeparator>
        <MenuLinkSeparator>
          <NavbarLink
            textContent="Contact"
            url="/contact"
            theme="themeLightGreen"
          />
          {!userContext.id || !userContext.token ? (
            <NavbarLink
              textContent="Connexion"
              url="/connexion"
              theme="themeLightGreen"
            />
          ) : (
            <AccountButton
              textContent="Mon compte"
              theme="themeSnow"
              openedTheme="themeLightBlue"
            />
          )}
        </MenuLinkSeparator>
      </GreenLinksContainer>
      <NavbarLink
        textContent="Réserver"
        url="/reserver"
        theme="themeDarkGrey"
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
  align-items: center;
  gap: 0.5vw;
`;

const GreenLinksContainer = styled.div`
  display: flex;
  gap: 2vw;
  justify-content: space-evenly;
`;

export default DesktopMenu;
