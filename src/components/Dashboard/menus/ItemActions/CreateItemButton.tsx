import SvgAddDishGallery from '@/components/svgs/addDishGallery';
import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import BackgroundPopUp from './BackgroundPopUp';
import FormSubmitButtons from './FormSubmitButtons';
import ItemAttributesList from './ItemAttributesList';

const CreateItemButton = ({
  newItem,
  setNewItem,
  createItem,
  setCreateItem,
}: {
  newItem: ModifyDashboardItem;
  setNewItem: Dispatch<SetStateAction<ModifyDashboardItem>>;
  createItem: boolean;
  setCreateItem: Dispatch<SetStateAction<boolean>>;
}) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);

  const changeErrorDisplay = (display: string) => {
    if (newItem.context.error.length > 0) {
      const error = document.getElementById('error' + newItem.attributes.title);
      if (error) {
        error.style.display = display;
      }
    }
  };

  useEffect(() => {
    if (confirm) {
      changeErrorDisplay('none');
      setNewItem({
        ...newItem,
        context: {
          ...newItem.context,
          confirm: true,
        },
      });
    }
    setConfirm(false);
  }, [confirm]);

  useEffect(() => {
    changeErrorDisplay('block');
  }, [newItem.context.error]);

  useEffect(() => {
    if (cancel) {
      setCreateItem(false);
    }
  }, [cancel]);

  useEffect(() => {
    const item = document.querySelector('.itemContainer');
    const buttonContainer = document.getElementById('createItemButton');
    if (item && buttonContainer) {
      buttonContainer.style.width = (item as HTMLDivElement).offsetWidth + 'px';
    }
  }, [document.querySelector('.itemContainer')]);
  return (
    <>
      <Container id="createItemButton">
        <Button onClick={() => setCreateItem(true)}>
          <SvgAddDishGallery />
        </Button>
      </Container>
      {createItem && (
        <BackgroundPopUp id="createPopUpBackground">
          <CreateForm id="popUpForm" onSubmit={(e) => e.preventDefault()}>
            <h2>Créer un nouvel élément</h2>
            <ItemAttributesList modifyItem={newItem} />
            <FormSubmitButtons setConfirm={setConfirm} setCancel={setCancel} />
            <Error id={'error' + newItem.attributes.title}>
              {newItem.context.error}
            </Error>
          </CreateForm>
        </BackgroundPopUp>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateForm = styled.form`
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
  border-radius: 50%;
  width: 175px;
  height: 175px;
  cursor: pointer;
  background-color: ${(props) => props.theme.lightGreen};
  border: ${(props) => `4px solid ${props.theme.darkGrey}`};
  margin-bottom: 30px;
`;

const Error = styled.p`
  display: none;
  margin-top: -20px;
  color: darkRed;
`;

export default CreateItemButton;
