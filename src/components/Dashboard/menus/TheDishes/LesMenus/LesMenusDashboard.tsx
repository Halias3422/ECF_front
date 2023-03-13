import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import SvgAddMenu from '@/components/svgs/addMenu';
import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { Menu } from '@/interfaces/menus';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateItemButton from '../../ItemActions/CreateItemButton';
import MenuItemDashboard from './MenuItemDashboard';

const LesMenusDashboard = () => {
  const defaultNewItem = {
    context: {
      id: '',
      confirm: false,
      error: '',
    },
    attributes: {
      title: '',
      formulas: [],
    },
  };
  const [menus, setMenus] = useState<Menu[]>();
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<ModifyDashboardItem>(
    JSON.parse(JSON.stringify(defaultNewItem))
  );

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
                <MenuItemDashboard
                  menu={menu}
                  index={index}
                  retreiveMenus={retreiveMenus}
                />
              </React.Fragment>
            );
          })}
          <CreateItemButton
            newItem={newItem}
            setNewItem={setNewItem}
            createItem={createItem}
            setCreateItem={setCreateItem}
            retreiveItems={() => retreiveMenus()}
            icon={<SvgAddMenu />}
            title="Créer un nouveau menu"
          />
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
  padding-top: 100px;
  border-radius: 48px;
  background-color: ${(props) => props.theme.lightBlue};
`;

export default LesMenusDashboard;
