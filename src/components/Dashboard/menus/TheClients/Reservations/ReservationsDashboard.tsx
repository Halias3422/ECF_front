import { API_ROUTES } from '@/api/routes';
import { getProtectedDataFromAPI } from '@/api/utils';
import UserContext from '@/context/UserContext';
import { ReservationFormData } from '@/interfaces/reservation';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const ReservationsDashboard = () => {
  const { userContext } = useContext(UserContext);
  const [reservationsList, setReservationsList] = useState<
    ReservationFormData[]
  >([]);

  const sortReservationsByDate = (reservations: ReservationFormData[]) => {
    const sortedReservations = reservations.sort((res1, res2) => {
      const [year1, month1, day1] = res1.date.split('-');
      const date1 = new Date(parseInt(year1), parseInt(month1), parseInt(day1));
      const [year2, month2, day2] = res2.date.split('-');
      const date2 = new Date(parseInt(year2), parseInt(month2), parseInt(day2));
      if (date1 > date2) {
        return 1;
      } else if (date1 === date2) {
        const hour1 = res1.hour.split(':');
        const hour2 = res2.hour.split(':');
        if (
          hour1[0] > hour2[0] ||
          (hour1[0] === hour2[0] && hour1[1] > hour2[1])
        ) {
          return 1;
        }
      }
      return 0;
    });
    return sortedReservations;
  };

  const retreiveAllReservations = async () => {
    const response = await getProtectedDataFromAPI(
      API_ROUTES.reservations.getAllReservationsWithAssociatedMail,
      userContext.userSession
    );
    const sortedReservations = sortReservationsByDate(response?.data.data);
    setReservationsList(sortedReservations);
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      retreiveAllReservations();
    }
  }, [userContext.contextLoaded]);
  return (
    <DashboardContainer className="dashboardConfigPanel">
      <ReservationsContainer className="carteDishesConfigPanelOpening">
        <ReservationsTable>
          <thead>
            <tr className="themeDarkBlue">
              <th>Utilisateur</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Couverts</th>
              <th>Allergies ou demandes</th>
            </tr>
          </thead>
          <tbody>
            {reservationsList.length === 0 ? (
              <tr>
                <td>Aucune réservation enregistrée</td>
              </tr>
            ) : (
              reservationsList.map(
                (reservation: ReservationFormData, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{reservation.userMail}</td>
                      <td>{reservation.date}</td>
                      <td>{reservation.hour}</td>
                      <td>{reservation.guestNumber}</td>
                      <td>{reservation.allergies}</td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </ReservationsTable>
      </ReservationsContainer>
    </DashboardContainer>
  );
};
const DashboardContainer = styled.div`
  table,
  th,
  td {
    border: 1px solid black;
    font-size: 24px;
    border-collapse: collapse;
    text-align: center;
    padding: 10px 20px;
  }
  th {
    background-color: ${(props) => props.theme.darkBlue};
  }
  tr:nth-child(odd) {
    background-color: ${(props) => props.theme.lightGreen};
  }
`;

const ReservationsContainer = styled.div`
  width: 100%;
  min-width: 1200px;
`;

const ReservationsTable = styled.table`
  width: 90%;
  margin: 0 auto;
`;
export default ReservationsDashboard;
