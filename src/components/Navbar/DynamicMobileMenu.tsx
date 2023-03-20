import { API_ROUTES } from '@/api/routes';
import { getProtectedDataFromAPI } from '@/api/utils';
import { UserLoginState } from '@/interfaces/users';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountButton from './AccountButton';
import NavbarLink from './NavbarLink';

const DynamicMobileMenu = ({
  hamburgerOpen,
  setHamburgerOpen,
  userContext,
}: {
  hamburgerOpen: boolean;
  setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
  userContext: UserLoginState;
}) => {
  const [userRole, setUserRole] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener('click', (event) => {
      const dynamicMenu = document.querySelector('#dynamicMenuPopUp');
      const hamburgerMenuIcon = document.querySelector('#hamburgerMenuIcon');
      const hamburgerMenu = document.querySelector('#hamburgerMenu');
      const hamburgerMenuPath = document.querySelector('#hamburgerPath');
      if (
        dynamicMenu?.className.includes('slideIn') &&
        !dynamicMenu?.contains(event.target as HTMLElement) &&
        event.target !== hamburgerMenuIcon &&
        event.target !== hamburgerMenu &&
        event.target !== hamburgerMenuPath
      ) {
        setHamburgerOpen(false);
      }
    });
  }, []);

  const getUserRole = async () => {
    if (userContext.loggedIn && userContext.userSession) {
      const response = await getProtectedDataFromAPI(
        API_ROUTES.users.getUserRole,
        userContext.userSession
      );
      const userRole = response?.data.data.role;
      if (userRole) {
        setUserRole(!!userRole);
      }
    }
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      getUserRole();
    }
  }, [userContext.contextLoaded]);

  return (
    <DynamicMenuPopUp
      id="dynamicMenuPopUp"
      className={hamburgerOpen ? 'slideIn' : 'slideOut'}
    >
      <MenuColumns>
        <NavbarLink
          textContent="Menus"
          url="/les-menus"
          theme="themeDarkGreen"
        />
        <NavbarLink
          textContent="Carte"
          url="/la-carte"
          theme="themeDarkGreen"
        />
        {!userContext.loggedIn ? (
          <>
            <NavbarLink
              textContent="Connexion"
              url="/connexion"
              theme="themeDarkGreen"
            />
            <NavbarLink
              textContent="Inscription"
              url="/inscription"
              theme="themeDarkGreen"
            />
          </>
        ) : (
          <AccountButton
            textContent="Mon compte"
            theme="themeSnow"
            openedTheme="themeLightBlue"
            userRole={userRole}
          />
        )}
        <NavbarLink
          textContent="Réserver"
          url="/reserver"
          theme="themeDarkGrey"
        />
      </MenuColumns>
    </DynamicMenuPopUp>
  );
};

const DynamicMenuPopUp = styled.div`
  position: absolute;
  right: 0;
  overflow-x: none;
  width: 0%;
  height: fit-content;
  padding-top: 2px;
  padding-bottom: 2px;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.darkGreen};
  padding-top: 20px;
  padding-bottom: 20px;
  transition: width ease-out 0.3s;
  border: ${(props) => props.theme.lightGreen} 2px solid;
  &.slideIn {
    width: 50%;
    @media screen and (max-width: 481px) {
      width: calc(100% - 4px);
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
