import { postProtectedDataToAPI } from '@/api/utils';
import LoadingAnim from '@/components/svgs/loadingAnim';
import UserContext from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BackgroundPopUp from './BackgroundPopUp';
import FormSubmitButtons from './FormSubmitButtons';

const ModifyPositionButton = ({
  item,
  allItems,
  apiRoute,
  retreiveItems,
}: {
  item: any;
  allItems: any;
  apiRoute: string;
  retreiveItems: any;
}) => {
  const { userContext } = useContext(UserContext);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [newPosition, setNewPosition] = useState<number>(item.position);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const saveNewItems = async () => {
    const dish1 = await postProtectedDataToAPI(
      apiRoute,
      item,
      userContext.userSession
    );
    if (dish1 && dish1.status === 200) {
      const dish2 = await postProtectedDataToAPI(
        apiRoute,
        allItems[newPosition - 1],
        userContext.userSession
      );
      if (dish2 && dish2.status === 200) {
        return '';
      }
      return dish2?.data;
    }
    return dish1?.data;
  };

  const handleModifyItemPosition = async () => {
    if (newPosition > allItems.length) {
      setConfirm(false);
      return;
    }
    const previousPosition = JSON.parse(JSON.stringify(item.position));
    const item2 = allItems.filter(
      (item: any) => item.position === newPosition - 1
    );
    item2[0].position = previousPosition;
    item.position = newPosition - 1;
    const res = await saveNewItems();
    if (res.length === 0) {
      retreiveItems();
      setConfirm(false);
      setOpenPopUp(false);
    } else {
      setErrorMessage(res);
    }
  };

  useEffect(() => {
    if (cancel) {
      setCancel(false);
      setErrorMessage('');
      setOpenPopUp(false);
    }
  }, [cancel]);

  useEffect(() => {
    if (confirm) {
      setErrorMessage('');
      handleModifyItemPosition();
    }
  }, [confirm]);
  return (
    <>
      <div className="raiseOnHover">
        <Button
          className="ModifyPositionButton"
          title="Modifier position"
          onClick={() => setOpenPopUp(true)}
        >
          {item.position + 1}
        </Button>
      </div>
      {openPopUp && (
        <BackgroundPopUp id="PositionPopUpBackground">
          <PositionForm id="positionForm" onSubmit={(e) => e.preventDefault()}>
            <h2>Modifier la Position de l'élément</h2>
            <input
              type="number"
              min="1"
              max={allItems.length}
              onChange={(e) => setNewPosition(parseInt(e.currentTarget.value))}
              defaultValue={item.position + 1}
            />
            {confirm && <LoadingAnim />}
            <Error id="errorPosition">{errorMessage}</Error>
            <FormSubmitButtons setConfirm={setConfirm} setCancel={setCancel} />
          </PositionForm>
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
  font-size: 22px;
  font-weight: 600;
`;

const Error = styled.p`
  display: none;
  margin-top: -20px;
  margin-bottom: -20px;
  color: darkRed;
  max-width: 400px;
  overflow-wrap: anywhere;
`;

const PositionForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.darkGrey};
  }
  label {
    font-size: 20px;
  }
`;

export default ModifyPositionButton;
