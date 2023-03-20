import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import GalleryDishItem from '@/components/Sections/GalleryDishes/GalleryDishItem';
import UserContext from '@/context/UserContext';
import {
  DashboardImageData,
  DashboardItemContext,
  ModifyDashboardItem,
} from '@/interfaces/dashboard';
import { GalleryDishData } from '@/interfaces/galleryDishes';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteItemButton from '../../ItemActions/DeleteItemButton';
import ModifyItemButton from '../../ItemActions/ModifyItemButton';
import ModifyPositionButton from '../../ItemActions/ModifyPositionButton';

const DishGalleryItemDashboard = ({
  dish,
  galleryDishes,
  retreiveGalleryDishes,
}: {
  dish: GalleryDishData;
  galleryDishes: GalleryDishData[];
  retreiveGalleryDishes: any;
}) => {
  const originalItem = {
    context: {
      id: dish.id as string,
      confirm: false,
      modified: false,
      error: '',
    },
    attributes: {
      title: dish.title,
      image: {
        file: dish.image,
        name: dish.image,
      },
    },
    previousImage: `${process.env.NEXT_PUBLIC_AWS_URL}/dishesGallery/DISHESGALLERY_${dish.image}`,
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
  const { userContext } = useContext(UserContext);

  const saveImageOnAPI = async (
    dish: GalleryDishData,
    image: DashboardImageData
  ) => {
    const isDuplicate = await getDataFromAPI(
      API_ROUTES.dishesGallery.verifyIfDuplicateTitleOrImage,
      { id: dish.id, title: dish.title, image: image.name }
    );
    if (isDuplicate.status !== 200) {
      return isDuplicate;
    }
    const formData = new FormData();
    formData.append('image', image.file as File, image.name);
    const saveImage = await postProtectedDataToAPI(
      API_ROUTES.dishesGallery.saveDishGalleryImage,
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
      API_ROUTES.dishesGallery.deleteImage,
      { image: imageName },
      userContext.userSession
    );
    return deleteImage;
  };

  const handleDeleteDishGalleryItem = async (dish: GalleryDishData) => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.dishesGallery.deleteDishGalleryItem,
      dish,
      userContext.userSession
    );
    if (response && response.status === 200) {
      const deleteImage = await deleteImageOnAPI(dish.image);
      if (deleteImage && deleteImage.status === 200) {
        fetch('/api/revalidate-dish-gallery');
        retreiveGalleryDishes();
      }
    }
  };

  const handleModifyDishGalleryItem = async (
    modifiedDish: GalleryDishData,
    image: DashboardImageData
  ) => {
    if (image.name !== originalItem.attributes.image.name) {
      const saveImage = await saveImageOnAPI(modifiedDish, image);
      if (!saveImage || saveImage.status !== 201) {
        return "l'image existe déjà";
      }
    }
    const modifiedItem = await postProtectedDataToAPI(
      API_ROUTES.dishesGallery.modifyDishGalleryItem,
      modifiedDish,
      userContext.userSession
    );
    if (modifiedItem && modifiedItem.status === 200) {
      const deleteImage = await deleteImageOnAPI(
        modifyItem.previousImage as string
      );
      if (deleteImage && deleteImage.status === 200) {
        fetch('/api/revalidate-dish-gallery');
        retreiveGalleryDishes();
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
      };
      const response = await handleModifyDishGalleryItem(modifiedDish, image);
      if (response.length === 0) {
        dish = {
          id: dish.id,
          title: modifyItem.attributes.title,
          image: modifyItem.attributes.image.name,
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
      await handleDeleteDishGalleryItem(dish);
    };
    if (deleteItem.confirm) {
      triggerItemDeletion();
    }
  }, [deleteItem.confirm]);

  return (
    <ItemContainer className="dashboardGalleryImageOpening">
      <GalleryDishItem dish={dish} />
      <h3>{dish.title}</h3>
      <ButtonsContainer className="dashboardGalleryImageOpening">
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
          allItems={galleryDishes}
          apiRoute={API_ROUTES.dishesGallery.modifyDishGalleryItem}
          retreiveItems={retreiveGalleryDishes}
        />
      </ButtonsContainer>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  border: ${(props) => `3px solid ${props.theme.darkGrey}`};
  border-radius: 10px;
  padding: 2px 2px;
  background-color: ${(props) => props.theme.darkGreen};
  article {
    width: 250px;
    height: 250px;
    max-width: unset;
  }
  h3 {
    margin-top: -30px;
    max-width: 250px;
    margin-bottom: 10px;
    text-align: center;
    overflow-wrap: break-word;
    color: ${(props) => props.theme.snow};
  }
  margin-bottom: 40px;
  overflow: hidden;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4%;
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.lightGreen};
  border-radius: 12px;
  button {
    width: 62px;
    height: 50px;
    cursor: pointer;
    border: ${(props) => `2px solid ${props.theme.darkGrey}`};
    background-color: ${(props) => props.theme.snow};
    border-radius: 8px;
  }
`;

export default DishGalleryItemDashboard;
