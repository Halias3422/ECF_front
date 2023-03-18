import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import SvgAddMenu from '@/components/svgs/addMenu';
import UserContext from '@/context/UserContext';
import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { Menu } from '@/interfaces/menus';
import React, { useContext } from 'react';
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
      id: '',
      title: '',
      formulas: [],
    },
  };
  const { userContext } = useContext(UserContext);
  const [menus, setMenus] = useState<Menu[]>();
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<ModifyDashboardItem>(
    JSON.parse(JSON.stringify(defaultNewItem))
  );

  const handleCreateNewMenu = async () => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.menus.createNewMenu,
      newItem.attributes,
      userContext.userSession
    );
    if (response && response.status === 201) {
      retreiveMenus();
      fetch('/api/revalidate-menus');
      setNewItem(JSON.parse(JSON.stringify(defaultNewItem)));
      setCreateItem(false);
    } else {
      setNewItem({
        ...newItem,
        context: {
          ...newItem.context,
          error: 'Erreur lors de la création (' + response?.data + ')',
          confirm: false,
        },
      });
    }
  };

  const retreiveMenus = async () => {
    const menusResponse = await getDataFromAPI(API_ROUTES.menus.getAllMenus);
    setMenus(menusResponse.data);
  };

  useEffect(() => {
    retreiveMenus();
  }, []);

  useEffect(() => {
    if (!createItem) {
      setNewItem(JSON.parse(JSON.stringify(defaultNewItem)));
    }
  }, [createItem]);

  useEffect(() => {
    if (newItem.context.confirm) {
      handleCreateNewMenu();
    }
  }, [newItem.context.confirm]);

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
