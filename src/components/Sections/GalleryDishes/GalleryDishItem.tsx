import { GalleryDishData } from '@/interfaces/galleryDishes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

const resetImagesContainersMargins = (imageContainers: HTMLCollection) => {
  for (let i = 0; i < imageContainers.length; i++) {
    (imageContainers[i] as HTMLDivElement).style.marginLeft = '0px';
    (imageContainers[i] as HTMLDivElement).style.marginRight = '0px';
  }
};

const handleTabletDisplay = (
  imageContainers: HTMLCollection,
  prevScreenWidth: number
) => {
  if (
    imageContainers.length % 2 !== 0 &&
    (prevScreenWidth < 769 || prevScreenWidth > 1024)
  ) {
    resetImagesContainersMargins(imageContainers);
    (
      imageContainers[imageContainers.length - 1] as HTMLDivElement
    ).style.margin = '0 auto 50px auto';
  }
};

const handleDesktopDisplay = (
  imageContainers: HTMLCollection,
  prevScreenWidth: number
) => {
  if (
    imageContainers.length % 3 !== 0 &&
    (prevScreenWidth < 1024 || prevScreenWidth > 1200)
  ) {
    resetImagesContainersMargins(imageContainers);
    if (imageContainers.length % 3 === 1) {
      (
        imageContainers[imageContainers.length - 1] as HTMLDivElement
      ).style.margin = '0 auto';
    } else if (imageContainers.length % 3 == 2) {
      (
        imageContainers[imageContainers.length - 2] as HTMLDivElement
      ).style.marginLeft = '17%';
      (
        imageContainers[imageContainers.length - 1] as HTMLDivElement
      ).style.marginRight = '17%';
    }
  }
};

const handleGridDisplay = (
  prevScreenWidth: number,
  setPrevScreenWidth: Dispatch<SetStateAction<number>>
) => {
  const galleryContainer = document.getElementById('galleryDishesContainer');
  if (galleryContainer) {
    const screenWidth = window.screen.width;
    const imageContainers = galleryContainer.getElementsByClassName(
      'galleryDishItemContainer'
    );
    if (screenWidth < 769 && (prevScreenWidth > 768 || prevScreenWidth === 0)) {
      resetImagesContainersMargins(imageContainers);
    }
    if (screenWidth > 768 && screenWidth < 1025) {
      handleTabletDisplay(imageContainers, prevScreenWidth);
    } else if (screenWidth > 1024) {
      handleDesktopDisplay(imageContainers, prevScreenWidth);
    }
    setPrevScreenWidth(screenWidth);
  }
  return;
};

const GalleryDishItem = ({ dish }: { dish: GalleryDishData }) => {
  const [prevScreenWidth, setPrevScreenWidth] = useState(0);
  useEffect(() => {
    window.addEventListener('resize', () =>
      handleGridDisplay(prevScreenWidth, setPrevScreenWidth)
    );
    handleGridDisplay(prevScreenWidth, setPrevScreenWidth);
  }, []);
  return (
    <GalleryDishItemContainer className="galleryDishItemContainer">
      <DishImage src={dish.image} alt={dish.title} title={dish.title} />
    </GalleryDishItemContainer>
  );
};

const GalleryDishItemContainer = styled.article`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  margin-bottom: 42px;
  @media screen and (min-width: 769px) {
    max-width: 48%;
    margin-bottom: 50px;
  }
  @media screen and (min-width: 1025px) {
    max-width: 32%;
  }
`;

const DishImage = styled.img`
  max-width: 100%;
  flex: 1 1 0;
  object-fit: cover;
`;

export default GalleryDishItem;
