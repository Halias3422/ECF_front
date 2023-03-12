import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import SvgAddDishGallery from '@/components/svgs/addDishGallery';
import UserContext from '@/context/UserContext';
import { CarteCategoryData } from '@/interfaces/carte';
import {
  DashboardImageData,
  ModifyDashboardItem,
} from '@/interfaces/dashboard';
import { DishCarteData, DishFormData } from '@/interfaces/dishes';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateItemButton from '../../ItemActions/CreateItemButton';
import CarteCategoryItem from './CarteCategoryItem';
import CarteItemDashboard from './CarteItemDashboard';

const LaCarteDashboard = () => {
  let totalCardIndex = 0;
  const [carteDishes, setCarteDishes] = useState<CarteCategoryData[]>();
  const { userContext } = useContext(UserContext);
  const defaultNewItem = {
    context: {
      id: '',
      confirm: false,
      error: '',
    },
    attributes: {
      title: '',
      description: '',
      image: {
        file: null,
        name: '',
      },
      price: '',
      category: '',
    },
  };
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<ModifyDashboardItem>(
    JSON.parse(JSON.stringify(defaultNewItem))
  );

  const retreiveDishes = async () => {
    const carteDishesResponse = await getDataFromAPI(
      API_ROUTES.dishes.getAllDishesByCategories
    );
    let carteDishes = carteDishesResponse?.data;
    const retreivedCategories = [];
    for (const dishCategory of carteDishes) {
      retreivedCategories.push(dishCategory.category.name);
    }
    const allCategoriesResponse = await getDataFromAPI(
      API_ROUTES.categories.getAllCategories
    );
    const allCategories = allCategoriesResponse.data;
    for (const category of allCategories) {
      if (!retreivedCategories.includes(category.name)) {
        carteDishes = [
          ...carteDishes,
          { category: { ...category }, dishes: [] },
        ];
      }
    }
    setCarteDishes(carteDishes);
  };

  useEffect(() => {
    retreiveDishes();
  }, []);

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
    formData.append('form_image', image.file as File, image.name);
    const saveImage = await postProtectedDataToAPI(
      API_ROUTES.dishes.saveDishImage,
      formData,
      userContext.userSession,
      'multipart/form-data'
    );
    return saveImage;
  };

  const handleCreateDishItem = async (
    dish: DishFormData,
    image: DashboardImageData
  ) => {
    const saveImage = await saveImageOnAPI(dish, image);
    if (saveImage && saveImage.status === 201) {
      const newItem = await postProtectedDataToAPI(
        API_ROUTES.dishes.createNewDish,
        dish,
        userContext.userSession
      );
      if (newItem && newItem.status === 201) {
        retreiveDishes();
        return '';
      }
      return 'Impossible de créer le nouvel élément (' + newItem?.data + ')';
    }
    return "l'image ou le titre existe déjà (" + saveImage.data + ')';
  };

  useEffect(() => {
    const triggerItemCreation = async () => {
      const dish = {
        title: newItem.attributes.title,
        description: newItem.attributes.description,
        image: newItem.attributes.image.name,
        price: newItem.attributes.price,
        category: newItem.attributes.category,
      };
      const image = {
        ...newItem.attributes.image,
      };
      const response = await handleCreateDishItem(dish, image);
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

  return (
    <DashboardContainer className="dashboardConfigPanel">
      <CarteDishesContainer className="carteDishesConfigPanelOpening">
        {carteDishes?.map((category: CarteCategoryData, index: number) => {
          return (
            <React.Fragment key={index + category.category.name}>
              <CarteCategoryItem
                category={category}
                retreiveDishes={() => retreiveDishes()}
              />
              {category.dishes.map((dish: DishCarteData, index: number) => {
                totalCardIndex += 1;
                return (
                  <DishContainer key={index} $isOdd={totalCardIndex % 2 !== 0}>
                    <CarteItemDashboard
                      dish={dish}
                      category={category}
                      $isOdd={totalCardIndex % 2 !== 0}
                      retreiveDishes={retreiveDishes}
                    />
                  </DishContainer>
                );
              })}
            </React.Fragment>
          );
        })}
      </CarteDishesContainer>
      <CreateContainer>
        <CreateItemButton
          newItem={newItem}
          setNewItem={setNewItem}
          createItem={createItem}
          setCreateItem={setCreateItem}
          retreiveDishes={() => retreiveDishes()}
          icon={<SvgAddDishGallery />}
          title="Créer un nouveau plat"
        />
      </CreateContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarteDishesContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  column-gap: 3%;
  min-height: fit-content;
`;

const DishContainer = styled.div<{ $isOdd: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isOdd ? 'row-reverse' : 'row')};
  width: 80%;
  .dishCardContainer {
    min-height: 300px;
  }
  img {
    width: 295px;
    height: 295px;
    right: 0.2vw;
  }
`;

const CreateContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20%;
`;

export default LaCarteDashboard;
