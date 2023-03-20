import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import CarteDishItem from '@/components/Sections/Carte/CarteDishItem';
import UserContext from '@/context/UserContext';
import { CarteCategoryData } from '@/interfaces/carte';
import {
  DashboardImageData,
  DashboardItemContext,
  ModifyDashboardItem,
} from '@/interfaces/dashboard';
import { DishCarteData, DishFormData } from '@/interfaces/dishes';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteItemButton from '../../ItemActions/DeleteItemButton';
import ModifyItemButton from '../../ItemActions/ModifyItemButton';
import ModifyPositionButton from '../../ItemActions/ModifyPositionButton';

const CarteItemDashboard = ({
  dish,
  allDishes,
  category,
  $isOdd,
  retreiveDishes,
}: {
  dish: DishCarteData;
  allDishes: DishCarteData[];
  category: CarteCategoryData;
  $isOdd: boolean;
  retreiveDishes: any;
}) => {
  const { userContext } = useContext(UserContext);
  const originalItem = {
    context: {
      id: dish.id as string,
      confirm: false,
      modified: false,
      error: '',
    },
    attributes: {
      title: dish.title,
      description: dish.description,
      image: {
        file: dish.image,
        name: dish.image,
      },
      price: dish.price,
      category: category.category.name,
    },
    previousImage: `${process.env.NEXT_PUBLIC_AWS_URL}/dishes/DISHES_${dish.image}`,
  };
  const [modifyItem, setModifyItem] = useState<ModifyDashboardItem>(
    JSON.parse(JSON.stringify(originalItem))
  );
  const [deleteItem, setDeleteItem] = useState<DashboardItemContext>({
    id: dish.id as string,
    confirm: false,
    modified: false,
    error: '',
  });

  const saveImageOnAPI = async (
    dish: DishFormData,
    image: DashboardImageData
  ) => {
    const isDuplicate = await getDataFromAPI(
      API_ROUTES.dishes.verifyIfDuplicateTitleOrImage,
      { id: dish.id, title: dish.title, image: image.name }
    );
    if (isDuplicate.status !== 200) {
      return isDuplicate;
    }
    const formData = new FormData();
    formData.append('image', image.file as Blob, image.name);
    const saveImage = await postProtectedDataToAPI(
      API_ROUTES.dishes.saveDishImage,
      formData,
      userContext.userSession,
      'multipart/form-data'
    );
    return saveImage;
  };

  const deleteImageOnAPI = async (imagePath: string) => {
    const imageSplit = imagePath.split('/');
    const imageName = imageSplit?.[imageSplit.length - 1];
    const deleteImage = await postProtectedDataToAPI(
      API_ROUTES.dishes.deleteImage,
      { image: imageName },
      userContext.userSession
    );
    return deleteImage;
  };

  const handleDeleteDishItem = async (dish: DishCarteData) => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.dishes.deleteDishItem,
      dish,
      userContext.userSession
    );
    if (response && response.status === 200) {
      const deleteImage = await deleteImageOnAPI(dish.image as string);
      if (deleteImage && deleteImage.status === 200) {
        retreiveDishes();
      }
    }
  };

  const handleModifyDishItem = async (
    modifiedDish: DishFormData,
    image: DashboardImageData
  ) => {
    if (image.name !== originalItem.attributes.image.name) {
      const saveImage = await saveImageOnAPI(modifiedDish, image);
      if (saveImage && saveImage.status !== 201) {
        return "l'image existe déjà";
      }
    }
    const modifiedItem = await postProtectedDataToAPI(
      API_ROUTES.dishes.modifyDishItem,
      modifiedDish,
      userContext.userSession
    );
    if (modifiedItem && modifiedItem.status === 200) {
      const deleteImage = await deleteImageOnAPI(
        modifyItem.previousImage as string
      );
      if (deleteImage && deleteImage.status === 200) {
        setModifyItem({
          ...modifyItem,
          context: {
            ...modifyItem.context,
            modified: true,
          },
        });
        retreiveDishes();
        return '';
      }
      return "impossible de supprimer l'image d'origine";
    }
    return "impossible de modifier l'élément";
  };

  useEffect(() => {
    const triggerItemModification = async () => {
      const image = {
        ...modifyItem.attributes.image,
      };
      const modifiedDish = {
        id: modifyItem.context.id,
        title: modifyItem.attributes.title,
        image: modifyItem.attributes.image.name,
        description: modifyItem.attributes.description,
        price: modifyItem.attributes.price,
        category: modifyItem.attributes.category,
      };
      const response = await handleModifyDishItem(modifiedDish, image);
      if (response.length === 0) {
        dish = {
          id: dish.id,
          title: modifyItem.attributes.title,
          image: modifyItem.attributes.image.name,
          description: modifyItem.attributes.description,
          price: modifyItem.attributes.price,
        };
      } else {
        setModifyItem({
          ...modifyItem,
          context: {
            ...modifyItem.context,
            confirm: false,
            error: 'Erreur: ' + response,
          },
        });
      }
    };
    if (modifyItem.context.confirm) {
      triggerItemModification();
    }
  }, [modifyItem.context.confirm]);

  useEffect(() => {
    const triggerItemDeletion = async () => {
      await handleDeleteDishItem(dish);
    };
    if (deleteItem.confirm) {
      triggerItemDeletion();
    }
  }, [deleteItem.confirm]);

  return (
    <CarteItemContainer $isOdd={$isOdd} className="carteDishItemOpening">
      <ConfigButtonsContainer $isOdd={$isOdd} className="carteDishItemOpening">
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
          item={dish}
          allItems={allDishes}
          apiRoute={API_ROUTES.dishes.modifyDishItem}
          retreiveItems={retreiveDishes}
        />
      </ConfigButtonsContainer>
      <CarteDishItem dish={dish} $isOdd={$isOdd} />
    </CarteItemContainer>
  );
};

const CarteItemContainer = styled.div<{ $isOdd: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.$isOdd ? 'row-reverse' : 'row')};
  .dishCardContainer {
    min-height: 300px;
  }
`;

const ConfigButtonsContainer = styled.div<{ $isOdd: boolean }>`
  height: 50%;
  width: 10%;
  margin-bottom: 42px;
  padding: 15px 0px;
  border-radius: ${(props) =>
    props.$isOdd ? '0px 24px 24px 0px' : '24px 0px 0px 24px'};
  display: flex;
  background-color: ${(props) => props.theme.darkBlue};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export default CarteItemDashboard;
