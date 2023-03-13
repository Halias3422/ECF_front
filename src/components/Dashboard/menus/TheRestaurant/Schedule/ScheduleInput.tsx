import { DaySchedule } from '@/interfaces/schedule';
import { roboto } from '@/styles/fonts';
import styled from 'styled-components';

const ScheduleInput = ({
  daySchedule,
  attribute,
  updateScheduleAttribute,
}: {
  daySchedule: DaySchedule;
  attribute: keyof DaySchedule;
  updateScheduleAttribute: any;
}) => {
  return (
    <InputContainer>
      <label htmlFor={daySchedule.dayOfWeek + daySchedule[attribute]}>
        {attribute.includes('Opening') ? 'Ouverture: ' : 'Fermeture: '}
      </label>
      <input
        className={roboto.className}
        type="time"
        defaultValue={daySchedule[attribute]}
        id={daySchedule.dayOfWeek + daySchedule[attribute]}
        min="00:00"
        max="23:59"
        onChange={(e) => updateScheduleAttribute(e, attribute)}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default ScheduleInput;
