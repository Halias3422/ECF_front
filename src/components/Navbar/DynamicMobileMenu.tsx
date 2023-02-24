import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import NavbarLink from './NavbarLink';

const DynamicMobileMenu = ({
  hamburgerOpen,
  setHamburgerOpen,
}: {
  hamburgerOpen: boolean;
  setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    window.addEventListener('click', (event) => {
      const dynamicMenu = document.querySelector('#dynamicMenuPopUp');
      const hamburgerMenuIcon = document.querySelector('#hamburgerMenuIcon');
      const hamburgerMenu = document.querySelector('#hamburgerMenu');
      const hamburgerMenuPath = document.querySelector('#hamburgerPath');
      if (
        dynamicMenu?.className.includes('slideIn') &&
        event.target !== dynamicMenu &&
        event.target !== hamburgerMenu &&
        event.target !== hamburgerMenuIcon &&
        event.target !== hamburgerMenuPath
      ) {
        setHamburgerOpen(false);
      }
    });
  }, []);
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
        <NavbarLink
          textContent="Contact"
          url="/contact"
          theme="themeDarkGreen"
        />
        <NavbarLink
          textContent="Connexion"
          url="/connexion"
          theme="themeDarkGreen"
        />
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
  transition: width ease-out 0.5s;
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
