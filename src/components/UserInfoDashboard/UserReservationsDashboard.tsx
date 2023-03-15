import { API_ROUTES } from '@/api/routes';
import { getProtectedDataFromAPI } from '@/api/utils';
import { PartialReservationData } from '@/interfaces/reservation';
import { UserLoginState } from '@/interfaces/users';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function UserReservationsDashboard({
  userContext,
}: {
  userContext: UserLoginState;
}) {
  const [userReservations, setUserReservations] = useState<
    PartialReservationData[]
  >([]);

  const getUserReservations = async () => {
    const response = await getProtectedDataFromAPI(
      API_ROUTES.reservations.getUserReservations,
      userContext.userSession
    );
    if (response?.status === 200) {
      setUserReservations(response.data.data);
    }
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      getUserReservations();
    }
  }, [userContext.contextLoaded]);
  return (
    <UserSubMenuContainer className="dashboardMenuOpening">
      <ReservationsListContainer>
        {userReservations.length > 0 &&
          userReservations?.map((reservation, index) => {
            const dateSplit = reservation.date.split('-');
            const dateString = new Date(
              Date.UTC(
                parseInt(dateSplit[0]),
                parseInt(dateSplit[1]),
                parseInt(dateSplit[2])
              )
            ).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return (
              <ReservationContainer key={index} $isOdd={index % 2 === 0}>
                <p>
                  Date: Le <b>{dateString}</b>
                </p>
                <p>
                  Heure: <b>{reservation.hour}</b>
                </p>
                <p>
                  Pour:{' '}
                  <b>
                    {reservation.guestNumber + ' '}
                    {parseInt(reservation.guestNumber) > 1
                      ? 'personnes'
                      : 'personne'}
                  </b>
                </p>
              </ReservationContainer>
            );
          })}
        {userReservations.length > 0 ? (
          <h3>
            Pour toute demande ou annulation, veuillez nous contacter par
            téléphone au 01.02.03.04.05
          </h3>
        ) : (
          <h3>Aucune réservation enregistrée</h3>
        )}
      </ReservationsListContainer>
    </UserSubMenuContainer>
  );
}

const UserSubMenuContainer = styled.article`
  margin-top: 60px;
  width: 100%;
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-radius: 48px;
  overflow: hidden;
`;

const ReservationsListContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  padding: 60px 0px;
  h3 {
    margin-top: 20px;
  }
`;

const ReservationContainer = styled.div<{ $isOdd: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 24px;
    margin: 0px;
  }
  padding: 30px;
  border-radius: 8px;
  border: ${(props) =>
    `3px solid ${
      props.$isOdd ? props.theme.lightGreen : props.theme.darkGreen
    }`};
`;

export default UserReservationsDashboard;
