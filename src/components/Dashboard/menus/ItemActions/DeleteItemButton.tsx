import SvgDelete from '@/components/svgs/delete';
import { GalleryDishDashboard } from '@/interfaces/galleryDishes';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const DeleteItemButton = ({
  deleteItem,
  setDeleteItem,
}: {
  deleteItem: GalleryDishDashboard;
  setDeleteItem: Dispatch<SetStateAction<GalleryDishDashboard>>;
}) => {
  return (
    <Button onClick={() => setDeleteItem({ ...deleteItem, confirm: true })}>
      <SvgDelete />
    </Button>
  );
};

const Button = styled.button`
  width: 62px;
  height: 50px;
  cursor: pointer;
  border: ${(props) => `2px solid ${props.theme.darkGrey}`};
  background-color: ${(props) => props.theme.snow};
  border-radius: 8px;
`;

export default DeleteItemButton;
