import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import MenuItem from '@/components/Sections/Menus/MenuItem';
import { Menu } from '@/interfaces/menus';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LesMenusDashboard = () => {
  const [menus, setMenus] = useState<Menu[]>();

  const retreiveMenus = async () => {
    const menusResponse = await getDataFromAPI(API_ROUTES.menus.getAllMenus);
    setMenus(menusResponse.data);
  };

  useEffect(() => {
    retreiveMenus();
  }, []);

  return (
    <DashboardContainer className="dashboardConfigPanel">
      <MenusContainer className="carteDishesConfigPanelOpening">
        <MenusBackground>
          {menus?.map((menu: Menu, index: number) => {
            return (
              <React.Fragment key={index + menu.title}>
                <MenuItem menu={menu} index={index} />
              </React.Fragment>
            );
          })}
        </MenusBackground>
      </MenusContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenusContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  min-height: fit-content;
`;

const MenusBackground = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  border-radius: 48px;
  background-color: ${(props) => props.theme.lightBlue};
`;

export default LesMenusDashboard;
