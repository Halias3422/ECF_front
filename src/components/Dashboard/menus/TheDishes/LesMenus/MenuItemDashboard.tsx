import { API_ROUTES } from '@/api/routes';
import { postProtectedDataToAPI } from '@/api/utils';
import MenuItem from '@/components/Sections/Menus/MenuItem';
import UserContext from '@/context/UserContext';
import {
  DashboardItemContext,
  ModifyDashboardItem,
} from '@/interfaces/dashboard';
import { Menu } from '@/interfaces/menus';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteItemButton from '../../ItemActions/DeleteItemButton';
import ModifyItemButton from '../../ItemActions/ModifyItemButton';
import ModifyPositionButton from '../../ItemActions/ModifyPositionButton';

const MenuItemDashboard = ({
  menu,
  index,
  retreiveMenus,
  allMenus,
}: {
  menu: Menu;
  index: number;
  retreiveMenus: any;
  allMenus: Menu[];
}) => {
  const { userContext } = useContext(UserContext);

  const originalItem = {
    context: {
      id: menu.id as string,
      confirm: false,
      modified: false,
      error: '',
    },
    attributes: {
      id: menu.id,
      title: menu.title,
      formulas: menu.formulas,
    },
  };
  const [modifyItem, setModifyItem] = useState<ModifyDashboardItem>(
    JSON.parse(JSON.stringify(originalItem))
  );
  const [deleteItem, setDeleteItem] = useState<DashboardItemContext>({
    id: menu.id as string,
    confirm: false,
    modified: false,
    error: '',
  });

  const handleModifyMenuItem = async (modifiedMenu: Menu) => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.menus.modifyMenu,
      modifiedMenu,
      userContext.userSession
    );
    if (response?.status !== 200) {
      setModifyItem({
        ...modifyItem,
        context: {
          ...modifyItem.context,
          confirm: false,
          error: 'Erreur lors de la modification (' + response?.data + ')',
        },
      });
    } else {
      menu = {
        id: menu.id,
        title: modifyItem.attributes.title,
        formulas: modifyItem.attributes.formulas,
      };
      setModifyItem({
        ...modifyItem,
        context: {
          ...modifyItem.context,
          modified: true,
        },
      });
      retreiveMenus();
      fetch('/api/revalidate-menus');
    }
  };

  const handleItemDeletion = async () => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.menus.deleteMenu,
      menu,
      userContext.userSession
    );
    if (response && response.status === 200) {
      retreiveMenus();
      fetch('/api/revalidate-menus');
    }
  };

  useEffect(() => {
    const triggerItemModification = async () => {
      const modifiedFormulas = [];
      for (const formula of modifyItem.attributes.formulas) {
        modifiedFormulas.push({
          id: formula.id,
          menuId: formula.menuId,
          title: formula.title,
          description: formula.description,
          price: formula.price,
        });
      }
      const modifiedMenu = {
        id: modifyItem.attributes.id,
        title: modifyItem.attributes.title,
        formulas: modifiedFormulas,
      };
      await handleModifyMenuItem(modifiedMenu);
    };
    if (modifyItem.context.confirm) {
      triggerItemModification();
    }
  }, [modifyItem.context.confirm]);

  useEffect(() => {
    if (deleteItem.confirm) {
      handleItemDeletion();
    }
  }, [deleteItem.confirm]);
  return (
    <MenuItemContainer>
      <MenuItem menu={menu} index={index} />
      <ConfigButtonsContainer $isOdd={index % 2 === 0}>
        <DeleteItemButton
          deleteItem={deleteItem}
          setDeleteItem={setDeleteItem}
        />
        <ModifyItemButton
          originalItem={originalItem}
          modifyItem={modifyItem}
          setModifyItem={setModifyItem}
        />
        <ModifyPositionButton
          item={menu}
          allItems={allMenus}
          apiRoute={API_ROUTES.menus.modifyMenu}
          retreiveItems={retreiveMenus}
        />
      </ConfigButtonsContainer>
    </MenuItemContainer>
  );
};

const MenuItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 80px;
  article {
    margin-bottom: 0px;
  }
`;

const ConfigButtonsContainer = styled.div<{ $isOdd: boolean }>`
  padding: 10px;
  border-radius: 0px 0px 24px 24px;
  border: ${(props) => `3px solid ${props.theme.snow}`};
  border-top: 0px;
  display: flex;
  background-color: ${(props) =>
    props.$isOdd ? props.theme.darkGreen : props.theme.lightGreen};
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export default MenuItemDashboard;
