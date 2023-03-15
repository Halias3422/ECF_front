import { API_ROUTES } from '@/api/routes';
import {
  getDataFromAPI,
  getProtectedDataFromAPI,
  postDataToAPI,
} from '@/api/utils';
import UserContext from '@/context/UserContext';
import {
  AvailableReservationHours,
  ReservationFormData,
} from '@/interfaces/reservation';
import { DaySchedule } from '@/interfaces/schedule';
import colorscheme from '@/styles/colorscheme';
import { roboto } from '@/styles/fonts';
import {
  FormEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import FormSubmit from '../FormSubmit/FormSubmit';
import AvailableHoursList from '../UserInfoDashboard/Reservations/AvailableHoursList';
import { getAvailableHours } from '../UserInfoDashboard/Reservations/reservationsUtils';

const ReservationForm = ({
  $isOdd,
  weekSchedule,
}: {
  $isOdd: boolean;
  weekSchedule: DaySchedule[];
}) => {
  const { userContext } = useContext(UserContext);
  const [reservationData, setReservationData] = useState<ReservationFormData>({
    guestNumber: '1',
    date: '',
    hour: '',
    allergies: '',
    service: '',
  });
  const [availableReservations, setAvailableReservations] =
    useState<AvailableReservationHours>({
      morning: [],
      afternoon: [],
      morningAvailableSeats: 100,
      afternoonAvailableSeats: 100,
    });
  const [restaurantSeatsCapacity, setRestaurantSeatsCapacity] =
    useState<number>(0);
  const [submitStatus, setSubmitStatus] = useState<string>('');

  const today = new Date();
  //return yyyy-mm-dd format
  const minReservationDate = today.toISOString().split('T')[0];
  const maxReservationDate = new Date(today.setDate(today.getDate() + 90))
    .toISOString()
    .split('T')[0];

  const getUserInfo = async () => {
    const userInfo = await getProtectedDataFromAPI(
      API_ROUTES.users.getOptionalInfo,
      userContext.userSession
    );
    if (userInfo?.status === 200) {
      setReservationData({
        ...reservationData,
        guestNumber: userInfo.data.data.defaultGuestNumber,
        allergies: userInfo.data.data.defaultAllergies,
      });
    }
  };

  const getRestaurantSeatsCapacity = async () => {
    const response = await getDataFromAPI(
      API_ROUTES.restaurant.getSeatsCapacity
    );
    if (response) {
      setRestaurantSeatsCapacity(parseInt(response.data[0].seatsCapacity));
    }
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      getUserInfo();
      getRestaurantSeatsCapacity();
    }
  }, [userContext.contextLoaded]);

  useEffect(() => {
    if (reservationData.date !== '') {
      getAvailableHours(
        reservationData,
        weekSchedule,
        setAvailableReservations,
        restaurantSeatsCapacity
      );
    }
  }, [reservationData.date]);

  const showDatePicker = (e: SyntheticEvent) => {
    const calendar = e.target as HTMLInputElement;
    if (calendar) {
      try {
        calendar.showPicker();
      } catch (e) {}
    }
  };

  const handleReservationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitElement = document.getElementById(
      'submitStatus'
    ) as HTMLParagraphElement;
    if (submitElement) {
      const response = await postDataToAPI(
        API_ROUTES.reservations.createReservation,
        { reservation: reservationData, userContext: userContext.userSession }
      );
      if (response?.status !== 201) {
        setSubmitStatus(response?.data);
        submitElement.style.color = 'darkRed';
      } else {
        setSubmitStatus(
          'Réservation enregistrée. Vous pouvez la consulter à partir de l\'onglet "Mes infos"'
        );
        submitElement.style.color = colorscheme.darkGreen;
      }
    }
  };

  return (
    <section
      id="reservationSection"
      className={`section ${$isOdd ? 'odd' : 'even'}`}
    >
      <div className="container">
        <ReservationFormContainer>
          <Header className="themeLightGreen">Réservation</Header>
          <Form onSubmit={(e) => handleReservationSubmit(e)}>
            <GuestsAndDateContainer>
              <FormItem>
                <label htmlFor="numberGuests">Nombre de couverts:</label>
                <input
                  type="number"
                  id="numberGuests"
                  className={`flexInput ${roboto.className}`}
                  min="1"
                  max="45"
                  defaultValue={reservationData.guestNumber}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      guestNumber: e.target.value,
                    })
                  }
                  required
                />
              </FormItem>
              <FormItem>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  className={`flexInput ${roboto.className}`}
                  onFocus={(e) => showDatePicker(e)}
                  onKeyDown={(e) => e.preventDefault()}
                  min={minReservationDate}
                  max={maxReservationDate}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      date: e.target.value,
                      hour: '',
                    })
                  }
                  required
                />
              </FormItem>
            </GuestsAndDateContainer>
            <FormItem id="AvailableHoursList">
              {reservationData.date && (
                <AvailableHoursList
                  availableReservations={availableReservations}
                  reservationData={reservationData}
                  setReservationData={setReservationData}
                />
              )}
            </FormItem>
            <FormItem>
              <label htmlFor="allergies">
                Allergies ou demandes supplémentaires:
              </label>
              <TextArea
                id="allergies"
                defaultValue={reservationData.allergies}
                className={roboto.className}
                onChange={(e) =>
                  setReservationData({
                    ...reservationData,
                    allergies: e.target.value,
                  })
                }
              />
            </FormItem>
            {reservationData.hour && (
              <FormItem id="submitItem">
                <p id="submitStatus">{submitStatus}</p>
                <FormSubmit textContent="Confirmer" theme="themeDarkGreen" />
              </FormItem>
            )}
          </Form>
        </ReservationFormContainer>
      </div>
    </section>
  );
};

const ReservationFormContainer = styled.article`
  width: 100%;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0px;
  padding: 40px 10%;
`;

const Form = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.snow};
  color: ${(props) => props.theme.darkGrey};
  padding: 60px 10%;
  text-align: center;
  width: 80%;
  #submitItem {
    margin-bottom: 10px;
  }
`;

const GuestsAndDateContainer = styled.div`
  @media screen and (min-width: 769px) {
    display: flex;
    gap: 10%;
    .flexInput {
      max-width: 320px;
    }
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;
  margin-bottom: 60px;
  input {
    width: 100%;
  }
  ,
  p {
    font-size: 24px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
`;

export default ReservationForm;
