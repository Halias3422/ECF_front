import SvgPencil from '@/components/svgs/pencil';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import FormSubmitButtons from './FormSubmitButtons';
import ItemAttributesList from './ItemAttributesList';
import { ModifyDashboardItem } from '@/interfaces/dashboard';
import BackgroundPopUp from './BackgroundPopUp';

const ModifyItemButton = ({
  originalItem,
  modifyItem,
  setModifyItem,
}: {
  originalItem: ModifyDashboardItem;
  modifyItem: ModifyDashboardItem;
  setModifyItem: Dispatch<SetStateAction<ModifyDashboardItem>>;
}) => {
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);

  const handleModifyItemClick = () => {
    setOpenPopUp(!openPopUp);
  };

  useEffect(() => {
    if (cancel) {
      setModifyItem(JSON.parse(JSON.stringify(originalItem)));
      if (document.querySelector('.previewImage')) {
        (document.querySelector('.previewImage') as HTMLImageElement).src =
          originalItem.previousImage as string;
      }
      setOpenPopUp(false);
      setCancel(false);
    }
  }, [cancel]);

  useEffect(() => {
    if (confirm) {
      setModifyItem({
        ...modifyItem,
        context: {
          ...modifyItem.context,
          confirm: true,
        },
      });
      if (document.querySelector('.previewImage')) {
        (document.querySelector('.previewImage') as HTMLImageElement).src =
          originalItem.previousImage as string;
      }
      setOpenPopUp(false);
      setConfirm(false);
    }
  }, [confirm]);

  return (
    <div>
      <Button title="Modifier élément" onClick={() => handleModifyItemClick()}>
        <SvgPencil />
      </Button>
      {openPopUp && (
        <BackgroundPopUp id="modifyPopUpBackground">
          <ModifyForm id="popUpForm" onSubmit={(e) => e.preventDefault()}>
            <h2>Modifier l'élément</h2>
            <ItemAttributesList modifyItem={modifyItem} />
            <FormSubmitButtons setConfirm={setConfirm} setCancel={setCancel} />
          </ModifyForm>
        </BackgroundPopUp>
      )}
    </div>
  );
};

const ModifyForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  label {
    font-size: 20px;
  }
`;

const Button = styled.button`
  width: 62px;
  height: 50px;
  cursor: pointer;
  border: ${(props) => `2px solid ${props.theme.darkGrey}`};
  background-color: ${(props) => props.theme.snow};
  border-radius: 8px;
`;

export default ModifyItemButton;
