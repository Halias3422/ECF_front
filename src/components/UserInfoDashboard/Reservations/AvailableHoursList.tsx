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
    <>
      <ServiceHeader>Service du midi:</ServiceHeader>
      {availableReservations.morningAvailableSeats -
        parseInt(reservationData.guestNumber) >=
      0 ? (
        <>
          <HoursContainer
            id={reservationData.date + reservationData.guestNumber}
          >
            {availableReservations.morning.map(
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
            {availableReservations.afternoon.map(
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
    </>
  );
};

const ServiceHeader = styled.h3`
  font-size: 32px;
  margin-top: 40px;
`;

const HoursContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  gap: 20px 2%;
  flex-wrap: wrap;
`;
const HourButton = styled.button`
  border-radius: 12px;
  border: ${(props) => `3px solid ${props.theme.darkGreen}`};
  font-size: 24px;
  min-width: fit-content;
  width: 100px;
  padding: 10px 2%;
  cursor: pointer;
`;

export default AvailableHoursList;
