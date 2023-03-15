export interface PartialReservationData {
  guestNumber: string;
  date: string;
  hour: string;
}
export interface ReservationFormData extends PartialReservationData {
  allergies: string;
  service: string;
  userMail?: string;
}

export interface AvailableReservationHours {
  morning: string[];
  afternoon: string[];
  morningAvailableSeats: number;
  afternoonAvailableSeats: number;
}
