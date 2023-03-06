import { DaySchedule } from '@/interfaces/schedule';
import styled from 'styled-components';

const FooterSchedule = ({ weekSchedule }: { weekSchedule: DaySchedule[] }) => {
  const formatDayScheduleHours = (daySchedule: DaySchedule) => {
    let dayHours = '';
    if (
      !daySchedule.morning_opening &&
      !daySchedule.morning_closing &&
      !daySchedule.afternoon_opening &&
      !daySchedule.afternoon_closing
    ) {
      return 'fermé';
    }
    if (daySchedule.morning_opening) {
      dayHours += daySchedule.morning_opening.slice(0, 5);
    }
    if (daySchedule.morning_closing) {
      dayHours.length > 0
        ? (dayHours += ' - ' + daySchedule.morning_closing.slice(0, 5))
        : (dayHours = daySchedule.morning_closing.slice(0, 5));
    }
    if (daySchedule.afternoon_opening) {
      dayHours.length > 0
        ? (dayHours += '\n' + daySchedule.afternoon_opening.slice(0, 5))
        : (dayHours = daySchedule.afternoon_opening.slice(0, 5));
    }
    if (daySchedule.afternoon_closing) {
      daySchedule.afternoon_opening
        ? (dayHours += ' - ' + daySchedule.afternoon_closing.slice(0, 5))
        : (dayHours += daySchedule.afternoon_closing.slice(0, 5));
    }
    return dayHours;
  };

  return (
    <FooterScheduleContainer>
      <h2>Nos horaires</h2>
      {weekSchedule?.map((day: DaySchedule, index: number) => {
        return (
          <DayScheduleContainer key={`dayScheduleContainer${index}`}>
            <DayOfWeek>
              <b>{day.day_of_week}:</b>
            </DayOfWeek>
            <DayScheduleHours>{formatDayScheduleHours(day)}</DayScheduleHours>
          </DayScheduleContainer>
        );
      })}
    </FooterScheduleContainer>
  );
};

const FooterScheduleContainer = styled.article`
  padding-bottom: 60px;
  @media screen and (min-width: 769px) {
    width: 80%;
  }
  @media screen and (min-width: 1025px) {
    width: 50%;
    padding-right: 5%;
    padding-bottom: 0px;
  }
`;

const DayOfWeek = styled.p`
  margin: 0;
`;

const DayScheduleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20%;
  @media screen and (max-width: 320px) {
    flex-direction: column;
  }
`;
const DayScheduleHours = styled.small`
  text-align: end;
  white-space: pre-line;
  margin-bottom: 25px;
  font-size: 14px;
  @media screen and (max-width: 320px) {
    text-align: start;
  }
  @media screen and (min-width: 1025px) {
    font-size: 16px;
  }
`;

export default FooterSchedule;
