import SvgDelete from '@/components/svgs/delete';
import { GalleryDishDashboard } from '@/interfaces/galleryDishes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import BackgroundPopUp from './BackgroundPopUp';
import FormSubmitButtons from './FormSubmitButtons';

// setDeleteItem({ ...deleteItem, confirm: true }

const DeleteItemButton = ({
  deleteItem,
  setDeleteItem,
}: {
  deleteItem: GalleryDishDashboard;
  setDeleteItem: Dispatch<SetStateAction<GalleryDishDashboard>>;
}) => {
  const [confirmPopUp, setConfirmPopUp] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (cancel) {
      setConfirmPopUp(false);
      setCancel(false);
    }
  }, [cancel]);

  useEffect(() => {
    if (confirm) {
      setDeleteItem({ ...deleteItem, confirm: true });
      setConfirmPopUp(false);
      setConfirm(false);
    }
  }, [confirm]);
  return (
    <>
      <Button
        title="Supprimer élément"
        className="raiseOnHover"
        onClick={() => setConfirmPopUp(true)}
      >
        <SvgDelete />
      </Button>
      {confirmPopUp && (
        <BackgroundPopUp>
          <WarningHeader>
            Êtes-vous sûr de vouloir supprimer cet objet ?<br />
            Cette action est irréversible
          </WarningHeader>
          <FormSubmitButtons setCancel={setCancel} setConfirm={setConfirm} />
        </BackgroundPopUp>
      )}
    </>
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

const WarningHeader = styled.h2`
  font-size: 24px;
`;

export default DeleteItemButton;
