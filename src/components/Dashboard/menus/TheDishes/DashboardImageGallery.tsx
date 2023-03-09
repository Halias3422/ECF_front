import {
  GalleryDishCreateDashboard,
  GalleryDishDashboard,
  GalleryDishData,
  GalleryDishFormData,
  GalleryDishModifyDashboard,
} from '@/interfaces/dishes';
import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import GalleryDishItem from '@/components/Sections/GalleryDishes/GalleryDishItem';
import React from 'react';
import SvgDelete from '@/components/svgs/delete';
import SvgPencil from '@/components/svgs/pencil';
import SvgAddDishGallery from '@/components/svgs/addDishGallery';
import UserContext from '@/context/UserContext';
import DeleteItemPopUp from '../../PopUps/DeleteItemPopUp';
import ModifyItemPopUp from '../../PopUps/ModifyItemPopUp';
import CreateItemPopUp from '../../PopUps/CreateItemPopUp';

const DashboardImageGallery = ({}: {}) => {
  const [galleryDishes, setGalleryDishes] = useState<GalleryDishData[]>();
  const [deleteItem, setDeleteItem] = useState<GalleryDishDashboard>({
    title: '',
    click: false,
    confirm: false,
  });
  const [modifyItem, setModifyItem] = useState<GalleryDishModifyDashboard>({
    context: {
      title: '',
      click: false,
      confirm: false,
    },
    attributes: {
      image: '',
      title: '',
    },
  });
  const [createItem, setCreateItem] = useState<GalleryDishCreateDashboard>({
    context: {
      title: '',
      click: false,
      confirm: false,
    },
    attributes: {
      image: {
        file: null,
        name: '',
      },
      title: '',
    },
  });
  const { userContext } = useContext(UserContext);

  const handleDeleteDishGalleryItem = async (dish: GalleryDishData) => {
    const response = await postProtectedDataToAPI(
      API_ROUTES.dishesGallery.deleteDishGalleryItem,
      dish,
      userContext.userSession
    );
    if (response?.status === 200) {
      document.getElementById(dish.title)?.remove();
    }
  };

  const handleModifyDishGalleryItem = async (dishTitle: string) => {};

  const handleCreateDishGalleryItem = async (dish: GalleryDishFormData) => {
    const formData = new FormData();
    formData.append(
      'form_image',
      createItem.attributes.image.file as File,
      createItem.attributes.image.name
    );
    const saveImage = await postProtectedDataToAPI(
      API_ROUTES.dishesGallery.saveDishGalleryImage,
      formData,
      userContext.userSession,
      'multipart/form-data'
    );
    if (saveImage && saveImage.status === 201) {
      const newItem = await postProtectedDataToAPI(
        API_ROUTES.dishesGallery.createNewDishGalleryItem,
        createItem.attributes,
        userContext.userSession
      );
      if (newItem && newItem.status === 201) {
        retreiveGalleryDishes();
      }
    }
  };

  const retreiveGalleryDishes = async () => {
    const response = await getDataFromAPI(
      API_ROUTES.dishesGallery.getAllDishes
    );
    setGalleryDishes(response.data);
  };

  useEffect(() => {
    retreiveGalleryDishes();
  }, []);

  useEffect(() => {
    if (deleteItem.confirm) {
      const dish = galleryDishes?.find(
        (dish) => dish.title === deleteItem.title
      );
      if (dish) {
        setDeleteItem({
          title: '',
          click: false,
          confirm: false,
        });
        handleDeleteDishGalleryItem(dish);
      }
    }
  }, [deleteItem.confirm]);

  useEffect(() => {
    if (createItem.context.confirm) {
      const dish = {
        title: createItem.attributes.title,
        image: createItem.attributes.image,
      };
      setCreateItem({
        context: {
          title: '',
          click: false,
          confirm: false,
        },
        attributes: {
          image: {
            file: null,
            name: '',
          },
          title: '',
        },
      });
      handleCreateDishGalleryItem(dish);
    }
  });

  return (
    <ConfigPanelContainer className="dashboardConfigPanelOpening">
      <h2>Galerie Actuelle</h2>
      <ConfigGalleryWrapper>
        {galleryDishes &&
          galleryDishes.length > 0 &&
          galleryDishes.map((dish: GalleryDishData, index: number) => {
            return (
              <GalleryConfigItem
                key={index}
                className="dashboardGalleryImageOpening"
                id={dish.title}
              >
                <GalleryDishItem dish={dish} />
                <h3>{dish.title}</h3>
                <ConfigOptionsContainer>
                  <button
                    onClick={() =>
                      setDeleteItem({
                        title: dish.title,
                        click: true,
                        confirm: false,
                      })
                    }
                  >
                    <SvgDelete />
                  </button>
                  <button
                    onClick={() =>
                      setModifyItem({
                        context: {
                          title: dish.title,
                          click: true,
                          confirm: false,
                        },
                        attributes: {
                          image: dish.image,
                          title: dish.title,
                        },
                      })
                    }
                  >
                    <SvgPencil />
                  </button>
                </ConfigOptionsContainer>
              </GalleryConfigItem>
            );
          })}
        <AddNewDish>
          <NewDishContainer
            title="Ajouter une nouvelle image"
            onClick={() =>
              setCreateItem({
                ...createItem,
                context: { ...createItem.context, click: true },
              })
            }
          >
            <SvgAddDishGallery />
          </NewDishContainer>
        </AddNewDish>
      </ConfigGalleryWrapper>
      <DeleteItemPopUp deleteItem={deleteItem} setDeleteItem={setDeleteItem} />
      <ModifyItemPopUp modifyItem={modifyItem} setModifyItem={setModifyItem} />
      <CreateItemPopUp createItem={createItem} setCreateItem={setCreateItem} />
    </ConfigPanelContainer>
  );
};

const ConfigPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-top: none;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
  padding: 60px 5%;
`;

const ConfigGalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 5%;
  justify-content: center;
  gap: 5%;
  margin-top: 20px;
`;

const GalleryConfigItem = styled.div`
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
    margin-bottom: 10px;
    text-align: center;
    color: ${(props) => props.theme.snow};
  }
  margin-bottom: 40px;
`;

const ConfigOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4%;
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 5px 5px;
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

const NewDishContainer = styled.button`
  border-radius: 50%;
  width: 175px;
  height: 175px;
  cursor: pointer;
  background-color: ${(props) => props.theme.lightGreen};
  border: ${(props) => `4px solid ${props.theme.darkGrey}`};
  margin-bottom: 30px;
`;

const AddNewDish = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DashboardImageGallery;
