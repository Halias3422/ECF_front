import { API_ROUTES } from '@/api/routes';
import { getProtectedDataFromAPI } from '@/api/utils';
import { UserLoginState } from '@/interfaces/users';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountButton from './AccountButton';
import NavbarLink from './NavbarLink';

const DesktopMenu = ({ userContext }: { userContext: UserLoginState }) => {
  const [userRole, setUserRole] = useState<boolean>(false);

  const getUserRole = async () => {
    if (userContext.loggedIn && userContext.userSession) {
      const response = await getProtectedDataFromAPI(
        API_ROUTES.users.getUserRole,
        userContext.userSession
      );
      const userRole = response?.data.data.role;
      if (userRole) {
        setUserRole(userRole);
      }
    }
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      getUserRole();
    }
  }, [userContext.contextLoaded]);
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
          {!userContext.userSession ? (
            <NavbarLink
              textContent="Connexion"
              url="/connexion"
              theme="themeLightGreen"
            />
          ) : (
            <AccountButton
              textContent="Mon compte"
              theme="themeSnow"
              openedTheme="themeDarkBlue"
              userRole={userRole}
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
