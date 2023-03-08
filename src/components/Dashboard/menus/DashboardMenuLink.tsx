import colorscheme from '@/styles/colorscheme';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import TheClients from './TheClients/TheClients';
import TheDishes from './TheDishes/TheDishes';
import TheRestaurant from './TheRestaurant/TheRestaurant';

const DashboardMenuLink = ({}: {}) => {
  const [openedMenu, setOpenedMenu] = useState<string>('');

  const handleMenuClick = (event: SyntheticEvent) => {
    const selectedButton = event.target as HTMLButtonElement;
    const allButtons = document.querySelectorAll('.menuButton');
    for (let i = 0; i < allButtons.length; i++) {
      const buttonStyle = (allButtons[i] as HTMLButtonElement).style;
      buttonStyle.backgroundColor = `${colorscheme.darkBlue}`;
      buttonStyle.color = `${colorscheme.snow}`;
      buttonStyle.border = `2px solid ${colorscheme.snow}`;
    }
    displayOpenedMenu();
    selectedButton.style.backgroundColor = `${colorscheme.snow}`;
    selectedButton.style.color = `${colorscheme.darkGrey}`;
    setOpenedMenu((event.target as HTMLButtonElement).id);
  };

  const displayOpenedMenu = () => {
    switch (openedMenu) {
      case 'theDishes':
        return <TheDishes />;
      case 'theClients':
        return <TheClients />;
      case 'theRestaurant':
        return <TheRestaurant />;
      case 'myAccount':
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div>
      <MenuLinkContainer>
        <MenuButtonItem
          id="theDishes"
          className="menuButton themeDarkBlue left"
          onClick={(event) => handleMenuClick(event)}
        >
          Les Plats
        </MenuButtonItem>
        <MenuButtonItem
          id="theClients"
          className="menuButton themeDarkBlue"
          onClick={(event) => handleMenuClick(event)}
        >
          Les Clients
        </MenuButtonItem>
        <MenuButtonItem
          id="theRestaurant"
          className="menuButton themeDarkBlue "
          onClick={(event) => handleMenuClick(event)}
        >
          Le Restaurant
        </MenuButtonItem>
        <MenuButtonItem
          id="myAccount"
          className="menuButton themeDarkBlue right"
          onClick={(event) => handleMenuClick(event)}
        >
          Mon Compte
        </MenuButtonItem>
      </MenuLinkContainer>
      {displayOpenedMenu()}
    </div>
  );
};

const MenuLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.darkBlue};
  padding: 3px 3px;
  border-radius: 26px;
  .left {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }
  .right {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }
`;

const MenuButtonItem = styled.button`
  font-size: 28px;
  white-space: nowrap;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  border: ${(props) => `2px solid ${props.theme.snow}`};
`;

export default DashboardMenuLink;
