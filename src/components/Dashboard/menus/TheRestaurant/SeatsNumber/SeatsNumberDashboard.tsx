import { API_ROUTES } from '@/api/routes';
import { getProtectedDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import UserContext from '@/context/UserContext';
import colorscheme from '@/styles/colorscheme';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const SeatsNumberDashboard = () => {
  const { userContext } = useContext(UserContext);
  const [seatsCapacity, setSeatsCapacity] = useState<number>(1);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleModifySeatsCapacity = async () => {
    const seatsCapacityStatus = document.getElementById(
      'seatsCapacityStatus'
    ) as HTMLParagraphElement;
    const response = await postProtectedDataToAPI(
      API_ROUTES.restaurant.modifySeatsCapacity,
      { seatsCapacity: seatsCapacity },
      userContext.userSession
    );
    if (response && response.status === 200) {
      setStatusMessage('Changement enregistré');
      seatsCapacityStatus.style.color = colorscheme.darkGreen;
    } else {
      setStatusMessage(
        'Erreur lors de la demande de changement (' + response?.data + ')'
      );
      seatsCapacityStatus.style.color = 'darkRed';
    }
  };

  const retreiveSeatsCapacity = async () => {
    const response = await getProtectedDataFromAPI(
      API_ROUTES.restaurant.getSeatsCapacity,
      userContext.userSession
    );
    if (response && response.status === 200) {
      setSeatsCapacity(response.data.data[0].seatsCapacity);
    } else {
      const seatsCapacityStatus = document.getElementById(
        'seatsCapacityStatus'
      ) as HTMLParagraphElement;
      setStatusMessage(
        'Erreur lors de la récupération des données (' + response?.data + ')'
      );
      seatsCapacityStatus.style.color = 'darkRed';
    }
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      retreiveSeatsCapacity();
    }
  }, [userContext.contextLoaded]);
  return (
    <DashboardContainer className="dashboardConfigPanel">
      <SeatsCapacityContainer className="carteDishesConfigPanelOpening">
        <SeatsForm
          onSubmit={(e) => e.preventDefault()}
          className="dashboardGalleryImageOpening"
        >
          <label htmlFor="seatsCapacity">
            Définir le nombre de couverts disponibles:{' '}
          </label>
          <input
            type="number"
            min={1}
            max={2147483647}
            value={seatsCapacity}
            onChange={(e) => setSeatsCapacity(parseInt(e.target.value))}
          ></input>
          <Confirm
            type="submit"
            value="Confirmer"
            onClick={() => handleModifySeatsCapacity()}
          />
          <StatusMessage id="seatsCapacityStatus">
            {statusMessage}
          </StatusMessage>
        </SeatsForm>
      </SeatsCapacityContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SeatsCapacityContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  min-height: fit-content;
`;

const SeatsForm = styled.form`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 40px 20px;
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-radius: 24px;
  overflow: hidden;
  label {
    font-size: 24px;
  }
`;

const Confirm = styled.input`
  background-color: ${(props) => props.theme.lightGreen};
  color: ${(props) => props.theme.darkGrey};
  font-size: 24px;
  padding: 5px 10px;
  width: 140px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const StatusMessage = styled.p``;

export default SeatsNumberDashboard;
