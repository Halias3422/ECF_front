import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI } from '@/api/utils';
import {
  AvailableReservationHours,
  ReservationFormData,
} from '@/interfaces/reservation';
import { DaySchedule } from '@/interfaces/schedule';
import { Dispatch, SetStateAction } from 'react';

export const getAvailableHours = async (
  reservationData: ReservationFormData,
  weekSchedule: DaySchedule[],
  setAvailableReservations: Dispatch<SetStateAction<AvailableReservationHours>>,
  restaurantSeatsCapacity: number
) => {
  const daySchedule = getSelectedDaySchedule(reservationData, weekSchedule);
  const seatsTaken = await getExistingReservations(reservationData.date);
  const morningHours = fillAvailableServiceHoursArray('morning', daySchedule);
  const afternoonHours = fillAvailableServiceHoursArray(
    'afternoon',
    daySchedule
  );
  setAvailableReservations({
    morning: morningHours,
    afternoon: afternoonHours,
    morningAvailableSeats: daySchedule.morningOpening
      ? restaurantSeatsCapacity - seatsTaken.morningSeatsTaken
      : 0,
    afternoonAvailableSeats: daySchedule.afternoonOpening
      ? restaurantSeatsCapacity - seatsTaken.afternoonSeatsTaken
      : 0,
  });
};

const getSelectedDaySchedule = (
  reservationData: ReservationFormData,
  weekSchedule: DaySchedule[]
): DaySchedule => {
  const [year, month, day] = reservationData.date.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const dayName = date.toLocaleDateString('fr', { weekday: 'long' });
  const daySchedule = weekSchedule.filter((schedule: DaySchedule) => {
    return schedule.dayOfWeek === dayName;
  });
  return daySchedule[0];
};

const getExistingReservations = async (date: string) => {
  const response = await getDataFromAPI(
    API_ROUTES.reservations.getAllPartialReservationsByDate,
    { date: date }
  );
  let morningSeatsTaken = 0;
  let afternoonSeatsTaken = 0;
  for (const reservation of response.data.data) {
    if (reservation.service === 'morning') {
      morningSeatsTaken += reservation.guestNumber;
    } else if (reservation.service === 'afternoon') {
      afternoonSeatsTaken += reservation.guestNumber;
    }
  }
  return { morningSeatsTaken, afternoonSeatsTaken };
};

const fillAvailableServiceHoursArray = (
  service: string,
  daySchedule: DaySchedule
) => {
  if (
    !daySchedule[(service + 'Opening') as keyof DaySchedule] ||
    !daySchedule[(service + 'Closing') as keyof DaySchedule]
  ) {
    return [];
  }
  const serviceOpening = daySchedule[(service + 'Opening') as keyof DaySchedule]
    .split(':')
    .map((time) => parseInt(time));
  const serviceClosing = daySchedule[(service + 'Closing') as keyof DaySchedule]
    .split(':')
    .map((time) => parseInt(time));
  const availableHours = [];
  while (
    serviceOpening[0] < serviceClosing[0] - 1 ||
    serviceOpening[1] <= serviceClosing[1]
  ) {
    availableHours.push(
      serviceOpening[0] +
        ':' +
        (serviceOpening[1] === 0 ? '00' : serviceOpening[1])
    );
    serviceOpening[1] += 15;
    if (serviceOpening[1] >= 60) {
      serviceOpening[0] += 1;
      serviceOpening[1] -= 60;
    }
  }
  return availableHours;
};
