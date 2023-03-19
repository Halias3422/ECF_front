import Image from 'next/image';
import { GalleryDishData } from '@/interfaces/galleryDishes';
import styled from 'styled-components';

const GalleryDishItem = ({ dish }: { dish: GalleryDishData }) => {
  return (
    <GalleryDishItemContainer className="galleryDishItemContainer">
      <div className="imageContainer">
        <Image
          loading="lazy"
          src={
            `${process.env.NEXT_PUBLIC_AWS_URL}/dishesGallery/DISHESGALLERY_` +
            dish.image
          }
          alt={dish.title}
          title={dish.title}
          className="image"
          fill
          sizes="(max-width: 1024px) 100%,
										50%"
        />
      </div>
    </GalleryDishItemContainer>
  );
};

const GalleryDishItemContainer = styled.article`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  margin-bottom: 42px;
  gap: 3%;
  @media screen and (min-width: 769px) {
    max-width: 48%;
    margin-bottom: 50px;
  }
  @media screen and (min-width: 1025px) {
    max-width: 32%;
  }
  > div {
    width: 100%;
    flex: 1 1 0;
    object-fit: cover;
  }
`;

export default GalleryDishItem;
