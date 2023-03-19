import { API_ROUTES } from '@/api/routes';
import { postProtectedDataToAPI } from '@/api/utils';
import SvgDelete from '@/components/svgs/delete';
import UserContext from '@/context/UserContext';
import { CarteCategoryData } from '@/interfaces/carte';
import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BackgroundPopUp from '../../ItemActions/BackgroundPopUp';
import FormSubmitButtons from '../../ItemActions/FormSubmitButtons';
import ModifyItemButton from '../../ItemActions/ModifyItemButton';

const CarteCategoryItem = ({
  category,
  retreiveDishes,
}: {
  category: CarteCategoryData;
  retreiveDishes: any;
}) => {
  const { userContext } = useContext(UserContext);
  const originalItem = {
    context: {
      id: category.category.id as string,
      confirm: false,
      error: '',
    },
    attributes: {
      id: category.category.id as string,
      name: category.category.name,
    },
  };
  const [modifyItem, setModifyItem] = useState<ModifyDashboardItem>(
    JSON.parse(JSON.stringify(originalItem))
  );
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);

  const handleCategoryDeletion = async () => {
    const error = document.getElementById(
      'deletionError'
    ) as HTMLParagraphElement;
    for (const dish of category.dishes) {
      const deletedDish = await postProtectedDataToAPI(
        API_ROUTES.dishes.deleteDishItem,
        dish,
        userContext.userSession
      );
      if (error && deletedDish?.status !== 200) {
        error.textContent =
          "Erreur lors de la suppression d'un plat (" + deletedDish?.data + ')';
        return;
      }
    }
    const deletedCategory = await postProtectedDataToAPI(
      API_ROUTES.categories.deleteCategory,
      category.category,
      userContext.userSession
    );
    if (deletedCategory?.status !== 200) {
      error.textContent =
        'Erreur lors de la suppression de la catégorie (' +
        deletedCategory?.data +
        ')';
      return;
    }
    retreiveDishes();
    fetch('/api/revalidate-dishes');
  };

  const handleModifyCategory = async () => {
    const modifiedCategory = await postProtectedDataToAPI(
      API_ROUTES.categories.modifyCategory,
      modifyItem.attributes,
      userContext.userSession
    );
    if (modifiedCategory?.status !== 200) {
      setModifyItem({
        ...modifyItem,
        context: {
          ...modifyItem.context,
          confirm: false,
          error:
            'Erreur lors de la modification (' + modifiedCategory?.data + ')',
        },
      });
      return;
    }
    category.category = {
      id: category.category.id,
      name: modifyItem.attributes.name,
    };
    retreiveDishes();
    fetch('/api/revalidate-dishes');
  };

  useEffect(() => {
    if (confirm) {
      handleCategoryDeletion();
      setConfirm(false);
      setDeleteItem(false);
    }
  }, [confirm]);

  useEffect(() => {
    if (cancel) {
      setCancel(false);
      setDeleteItem(false);
    }
  }, [cancel]);

  useEffect(() => {
    if (modifyItem.context.confirm) {
      handleModifyCategory();
    }
  }, [modifyItem.context.confirm]);
  return (
    <>
      <CategoryHeader className="themeDarkBlue carteDishItemOpening">
        <DeleteButton
          className="raiseOnHover"
          onClick={() => setDeleteItem(true)}
        >
          <SvgDelete />
        </DeleteButton>

        <h2>{category.category.name}</h2>
        <ButtonsContainer>
          <ModifyItemButton
            originalItem={originalItem}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
          />
        </ButtonsContainer>
      </CategoryHeader>
      {deleteItem && (
        <BackgroundPopUp>
          <>
            {category.dishes.length > 0 ? (
              <Warning>
                Cette catégorie contient plusieurs plats
                <br />
                En la supprimant, vous supprimerez également ces plats
              </Warning>
            ) : (
              <Warning>
                Êtes vous sûr de vouloir supprimer cette catégorie ?<br />
                Cette action est irréversible
              </Warning>
            )}
            <Error id="deletionError"></Error>
            <FormSubmitButtons setConfirm={setConfirm} setCancel={setCancel} />
          </>
        </BackgroundPopUp>
      )}
    </>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
`;

const DeleteButton = styled.button`
  width: 62px;
  height: 50px;
  cursor: pointer;
  border: ${(props) => `2px solid ${props.theme.darkGrey}`};
  background-color: ${(props) => props.theme.snow};
  border-radius: 8px;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  text-align: center;
  padding: 25px 0px;
  margin: 60px 0px;
  gap: 5%;
  border-radius: 48px;
  h2 {
    margin-bottom: 0px;
  }
`;

const Warning = styled.h2`
  color: ${(props) => props.theme.darkGrey};
  font-size: 22px;
`;

const Error = styled.p`
  color: darkRed;
`;

export default CarteCategoryItem;
