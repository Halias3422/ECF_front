import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import SvgAddDishGallery from '@/components/svgs/addDishGallery';
import UserContext from '@/context/UserContext';
import {
  DashboardImageData,
  ModifyDashboardItem,
} from '@/interfaces/dashboard';
import { GalleryDishData } from '@/interfaces/galleryDishes';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateItemButton from '../../ItemActions/CreateItemButton';
import DishGalleryItemDashboard from './DishGalleryItemDashboard';

const DishesGalleryDashboard = () => {
  const { userContext } = useContext(UserContext);
  const defaultNewItem = {
    context: {
      id: '',
      confirm: false,
      error: '',
    },
    attributes: {
      title: '',
      image: {
        file: null,
        name: '',
      },
    },
  };
  const [galleryDishes, setGalleryDishes] = useState<GalleryDishData[]>();
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<ModifyDashboardItem>(
    JSON.parse(JSON.stringify(defaultNewItem))
  );

  const retreiveGalleryDishes = async () => {
    const response = await getDataFromAPI(
      API_ROUTES.dishesGallery.getAllDishes
    );
    setGalleryDishes(response.data);
  };

  useEffect(() => {
    retreiveGalleryDishes();
  }, []);

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
    formData.append('image', image.file as File);
    const saveImage = await postProtectedDataToAPI(
      API_ROUTES.dishesGallery.saveDishGalleryImage,
      formData,
      userContext.userSession,
      'multipart/form-data'
    );
    return saveImage;
  };

  const handleCreateDishGalleryItem = async (
    dish: GalleryDishData,
    image: DashboardImageData
  ) => {
    const saveImage = await saveImageOnAPI(dish, image);
    if (saveImage && saveImage.status === 201) {
      const newItem = await postProtectedDataToAPI(
        API_ROUTES.dishesGallery.createNewDishGalleryItem,
        dish,
        userContext.userSession
      );
      if (newItem && newItem.status === 201) {
        retreiveGalleryDishes();
        fetch('api/revalidate-dish-gallery');
        return '';
      }
      return 'Impossible de créer le nouvel élément';
    }
    return "l'image existe déjà";
  };

  useEffect(() => {
    const triggerItemCreation = async () => {
      const dish = {
        title: newItem.attributes.title,
        image: newItem.attributes.image.name,
      };
      const image = {
        ...newItem.attributes.image,
      };
      const response = await handleCreateDishGalleryItem(dish, image);
      if (response.length === 0) {
        setNewItem(JSON.parse(JSON.stringify(defaultNewItem)));
        setCreateItem(false);
      } else {
        setNewItem({
          ...newItem,
          context: {
            ...newItem.context,
            error: 'Erreur: ' + response,
            confirm: false,
          },
        });
      }
    };
    if (newItem.context.confirm) {
      triggerItemCreation();
    }
  }, [newItem.context.confirm]);

  useEffect(() => {
    if (!createItem) {
      setNewItem(JSON.parse(JSON.stringify(defaultNewItem)));
    }
  }, [createItem]);

  return (
    <div className="dashboardConfigPanel dishesGalleryConfigPanelOpening">
      <DishesGalleryContainer>
        {galleryDishes &&
          galleryDishes.length > 0 &&
          galleryDishes.map((dish: GalleryDishData) => {
            return (
              <React.Fragment key={dish.image + dish.title + dish.id}>
                <DishGalleryItemDashboard
                  dish={dish}
                  retreiveGalleryDishes={retreiveGalleryDishes}
                />
              </React.Fragment>
            );
          })}
      </DishesGalleryContainer>
      <CreateItemButton
        newItem={newItem}
        setNewItem={setNewItem}
        createItem={createItem}
        setCreateItem={setCreateItem}
        icon={<SvgAddDishGallery />}
        title="Créer une nouvelle image"
        retreiveItems={() => {}}
      />
    </div>
  );
};

const DishesGalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  justify-content: center;
  align-items: center;
  column-gap: 3%;
  min-height: fit-content;
`;
export default DishesGalleryDashboard;
