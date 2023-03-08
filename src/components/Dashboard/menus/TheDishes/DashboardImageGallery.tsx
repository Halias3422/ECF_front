import { GalleryDishData } from '@/interfaces/dishes';
import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import GalleryDishItem from '@/components/Sections/GalleryDishes/GalleryDishItem';
import React from 'react';
import SvgDelete from '@/components/svgs/delete';
import SvgPencil from '@/components/svgs/pencil';
import SvgAddDishGallery from '@/components/svgs/addDishGallery';

const DashboardImageGallery = ({}: {}) => {
  const [galleryDishes, setGalleryDishes] = useState<GalleryDishData[]>();

  useEffect(() => {
    const retreiveGalleryDishes = async () => {
      const response = await getDataFromAPI(
        API_ROUTES.dishesGallery.getAllDishes
      );
      setGalleryDishes(response.data);
    };
    retreiveGalleryDishes();
  }, []);
  return (
    <ConfigPanelContainer className="dashboardConfigPanelOpening">
      <h2>Galerie Actuelle</h2>
      <ConfigGalleryWrapper>
        {galleryDishes &&
          galleryDishes.map((dish: GalleryDishData, index: number) => {
            return (
              <GalleryConfigItem
                key={index}
                className="dashboardGalleryImageOpening"
              >
                <GalleryDishItem dish={dish} />
                <p>{dish.title}</p>
                <ConfigOptionsContainer>
                  <button>
                    <SvgDelete />
                  </button>
                  <button>
                    <SvgPencil />
                  </button>
                </ConfigOptionsContainer>
              </GalleryConfigItem>
            );
          })}
        <AddNewDish>
          <NewDishContainer>
            <SvgAddDishGallery />
          </NewDishContainer>
        </AddNewDish>
      </ConfigGalleryWrapper>
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
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-radius: 8px;
  background-color: ${(props) => props.theme.lightBlue};
  article {
    width: 250px;
    height: 250px;
    max-width: unset;
  }
  p {
    margin-top: -30px;
    margin-bottom: 20px;
    text-align: center;
    color: ${(props) => props.theme.snow};
  }
  margin-bottom: 40px;
`;

const ConfigOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2%;
  margin-bottom: 5px;
  button {
    width: 62px;
    height: 50px;
    cursor: pointer;
    background-color: ${(props) => props.theme.snow};
    border: ${(props) => `2px solid ${props.theme.darkGrey}`};
    border-radius: 8px;
  }
`;

const NewDishContainer = styled.button`
  border-radius: 50%;
  width: 175px;
  height: 175px;
  cursor: pointer;
  background-color: ${(props) => props.theme.darkBlue};
  border: ${(props) => `4px solid ${props.theme.lightGreen}`};
  margin-bottom: 30px;
`;

const AddNewDish = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DashboardImageGallery;
