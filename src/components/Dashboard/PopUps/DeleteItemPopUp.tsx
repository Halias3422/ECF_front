import { GalleryDishDashboard } from '@/interfaces/dishes';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import BackgroundPopUp from './BackgroundPopUp';

const DeleteItemPopUp = ({
  deleteItem,
  setDeleteItem,
}: {
  deleteItem: GalleryDishDashboard;
  setDeleteItem: Dispatch<SetStateAction<GalleryDishDashboard>>;
}) => {
  useEffect(() => {
    const background = document.getElementById('deletePopUpBackground');
    if (background) {
      background.style.top = window.scrollX.toString() + 'px';
      background.style.height =
        document.documentElement.scrollHeight.toString() + 'px';
    }
  }, [deleteItem.click]);
  if (deleteItem.click) {
    return (
      <BackgroundPopUp id="deletePopUpBackground">
        <label>
          Êtes-vous sûr de vouloir supprimer cet élément ?<br />
          Cette action est irréversible
        </label>
        <ButtonsContainer>
          <Confirm
            onClick={() =>
              setDeleteItem({
                ...deleteItem,
                confirm: true,
              })
            }
          >
            Confirmer
          </Confirm>
          <Cancel
            onClick={() =>
              setDeleteItem({
                title: '',
                click: false,
                confirm: false,
              })
            }
          >
            Annuler
          </Cancel>
        </ButtonsContainer>
      </BackgroundPopUp>
    );
  }
  return <></>;
};

const ButtonsContainer = styled.div`
  display: flex;
  width: fit-content;
  gap: 20px;
  justify-content: space-between;
  button {
    font-size: 24px;
    padding: 5px 10px;
    width: 140px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const Confirm = styled.button`
  background-color: ${(props) => props.theme.lightGreen};
  color: ${(props) => props.theme.darkGrey};
`;

const Cancel = styled.button`
  background-color: darkRed;
  color: ${(props) => props.theme.snow};
`;

export default DeleteItemPopUp;
