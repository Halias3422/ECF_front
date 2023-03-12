import { API_ROUTES } from '@/api/routes';
import { postProtectedDataToAPI } from '@/api/utils';
import MenuItem from '@/components/Sections/Menus/MenuItem';
import UserContext from '@/context/UserContext';
import {
  DashboardItemContext,
  ModifyDashboardItem,
} from '@/interfaces/dashboard';
import { Formula } from '@/interfaces/formulas';
import { Menu } from '@/interfaces/menus';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteItemButton from '../../ItemActions/DeleteItemButton';
import ModifyItemButton from '../../ItemActions/ModifyItemButton';

const MenuItemDashboard = ({ menu, index }: { menu: Menu; index: number }) => {
  const { userContext } = useContext(UserContext);

  const originalItem = {
    context: {
      id: menu.id as string,
      confirm: false,
      error: '',
    },
    attributes: {
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
    error: '',
  });

  const handleModifiedMenuFormulas = async (formulas: Formula[]) => {
    const deletedFormulas = originalItem.attributes.formulas.filter(
      (originalFormula) => {
        return !formulas.some((newFormula) => {
          return originalFormula.id === newFormula.id;
        });
      }
    );
    for (const formula of deletedFormulas) {
      const deleteFormula = await postProtectedDataToAPI(
        API_ROUTES.formulas.deleteFormula,
        formula,
        userContext.userSession
      );
    }
  };

  const handleModifyMenuItem = async (modifiedMenu: Menu) => {
    await handleModifiedMenuFormulas(modifiedMenu.formulas);
  };

  useEffect(() => {
    const triggerItemModification = async () => {
      const modifiedFormulas = [];
      for (const formula of modifyItem.attributes.formulas) {
        modifiedFormulas.push({
          id: formula.id,
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
      const response = await handleModifyMenuItem(modifiedMenu);
    };
    if (modifyItem.context.confirm) {
      triggerItemModification();
    }
  }, [modifyItem.context.confirm]);

  useEffect(() => {
    if (deleteItem.confirm) {
      console.log('deleteConfirm');
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
