import LoadingAnim from '@/components/svgs/loadingAnim';
import {
  AvailableReservationHours,
  ReservationFormData,
} from '@/interfaces/reservation';
import colorscheme from '@/styles/colorscheme';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styled from 'styled-components';

const AvailableHoursList = ({
  availableReservations,
  reservationData,
  setReservationData,
}: {
  availableReservations: AvailableReservationHours;
  reservationData: ReservationFormData;
  setReservationData: Dispatch<SetStateAction<ReservationFormData>>;
}) => {
  const handleSelectHour = (e: SyntheticEvent, service: string) => {
    const button = e.target as HTMLButtonElement;
    const buttons = document
      .getElementById('AvailableHoursList')
      ?.getElementsByTagName('button');
    if (button && buttons) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = colorscheme.darkGreen;
        buttons[i].style.color = colorscheme.snow;
      }
      button.style.backgroundColor = colorscheme.snow;
      button.style.color = colorscheme.darkGrey;
      setReservationData({
        ...reservationData,
        hour: button.textContent as string,
        service: service,
      });
    }
  };
  return (
    <HoursListContainer>
      <ServiceHeader>Service du midi:</ServiceHeader>
      {availableReservations.morningAvailableSeats -
        parseInt(reservationData.guestNumber) >=
      0 ? (
        <>
          <HoursContainer
            id={reservationData.date + reservationData.guestNumber}
          >
            {!availableReservations ? (
              <LoadingAnim />
            ) : (
              availableReservations.morning &&
              availableReservations.morning.length > 0 &&
              availableReservations.morning.map(
                (hour: string, index: number) => {
                  return (
                    <HourButton
                      type="button"
                      className="themeDarkGreen"
                      key={index + hour}
                      onClick={(e) => handleSelectHour(e, 'morning')}
                    >
                      {hour}
                    </HourButton>
                  );
                }
              )
            )}
          </HoursContainer>
          <p>
            {availableReservations.morningAvailableSeats} places disponibles
          </p>
        </>
      ) : availableReservations.morning.length > 0 ? (
        <p>
          Seulement {availableReservations.morningAvailableSeats} places
          disponibles
        </p>
      ) : (
        <p>Restaurant fermé</p>
      )}
      <ServiceHeader>Service du soir:</ServiceHeader>
      {availableReservations.afternoonAvailableSeats -
        parseInt(reservationData.guestNumber) >=
      0 ? (
        <>
          <HoursContainer
            id={reservationData.guestNumber + reservationData.date}
          >
            {!availableReservations ? (
              <LoadingAnim />
            ) : (
              availableReservations.afternoon &&
              availableReservations.afternoon.length > 0 &&
              availableReservations.afternoon.map(
                (hour: string, index: number) => {
                  return (
                    <HourButton
                      type="button"
                      className="themeDarkGreen"
                      key={index + hour}
                      onClick={(e) => handleSelectHour(e, 'afternoon')}
                    >
                      {hour}
                    </HourButton>
                  );
                }
              )
            )}
          </HoursContainer>
          <p>
            {availableReservations.afternoonAvailableSeats} places disponibles
          </p>
        </>
      ) : availableReservations.afternoon.length > 0 ? (
        <p>
          Seulement {availableReservations.afternoonAvailableSeats} places
          disponibles
        </p>
      ) : (
        <p>Restaurant fermé</p>
      )}
    </HoursListContainer>
  );
};

const HoursListContainer = styled.div`
  text-align: center;
  p {
    text-align: center;
  }
`;

const ServiceHeader = styled.h3`
  font-size: 32px;
  @media screen and (min-width: 769px) {
    margin-top: 40px;
  }
`;

const HoursContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: center;
  gap: 20px 2%;
  flex-wrap: wrap;
  @media screen and (min-width: 769px) {
    justify-content: flex-start;
    margin-bottom: 40px;
  }
`;
const HourButton = styled.button`
  border-radius: 12px;
  border: ${(props) => `3px solid ${props.theme.darkGreen}`};
  min-width: fit-content;
  width: 100px;
  padding: 10px 2%;
  cursor: pointer;
  font-size: 18px;
  @media screen and (min-width: 769px) {
    font-size: 24px;
  }
`;

export default AvailableHoursList;
