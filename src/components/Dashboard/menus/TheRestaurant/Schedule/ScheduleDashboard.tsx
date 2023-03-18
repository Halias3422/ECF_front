import { API_ROUTES } from '@/api/routes';
import { getDataFromAPI, postProtectedDataToAPI } from '@/api/utils';
import UserContext from '@/context/UserContext';
import { DaySchedule } from '@/interfaces/schedule';
import colorscheme from '@/styles/colorscheme';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ScheduleInput from './ScheduleInput';

const ScheduleDashboard = () => {
  const { userContext } = useContext(UserContext);
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[] | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const retreiveWeekSchedule = async () => {
    const response = await getDataFromAPI(API_ROUTES.schedule.getWeekSchedule);
    setWeekSchedule(response.data);
  };

  const handleModifySchedule = async () => {
    const weekScheduleStatus = document.getElementById(
      'weekScheduleStatus'
    ) as HTMLParagraphElement;
    const response = await postProtectedDataToAPI(
      API_ROUTES.schedule.modifyWeekSchedule,
      weekSchedule,
      userContext.userSession
    );
    if (response && response.status === 200) {
      setStatusMessage('Changement enregistré');
      weekScheduleStatus.style.color = colorscheme.darkGreen;
      fetch('/api/revalidate-all');
    } else {
      setStatusMessage(
        'Erreur lors de la demande de changement (' + response?.data + ')'
      );
      weekScheduleStatus.style.color = 'darkRed';
    }
  };

  const updateScheduleAttribute = (
    e: ChangeEvent<HTMLInputElement>,
    attribute: keyof DaySchedule,
    index: number
  ) => {
    const newSchedule = [...(weekSchedule as DaySchedule[])];
    newSchedule[index][attribute] = e.target.value;
    setWeekSchedule(newSchedule);
  };

  useEffect(() => {
    if (userContext.contextLoaded) {
      retreiveWeekSchedule();
    }
  }, [userContext.contextLoaded]);

  return (
    <DashboardContainer className="dashboardConfigPanel">
      <ScheduleContainer className="carteDishesConfigPanelOpening">
        <ScheduleForm onSubmit={(e) => e.preventDefault()}>
          <GridContainer>
            {weekSchedule?.map((daySchedule: DaySchedule, index: number) => {
              return (
                <DayContainer
                  key={index}
                  $isOdd={index % 2 === 0}
                  className="dashboardGalleryImageOpening"
                >
                  <DayHeader $isOdd={index % 2 === 0}>
                    {daySchedule.dayOfWeek}
                  </DayHeader>
                  <h3>Horaires en journée</h3>
                  <OpenCloseContainer>
                    <ScheduleInput
                      daySchedule={daySchedule}
                      attribute="morningOpening"
                      updateScheduleAttribute={(
                        e: ChangeEvent<HTMLInputElement>
                      ) => updateScheduleAttribute(e, 'morningOpening', index)}
                    />
                    <ScheduleInput
                      daySchedule={daySchedule}
                      attribute="morningClosing"
                      updateScheduleAttribute={(
                        e: ChangeEvent<HTMLInputElement>
                      ) => updateScheduleAttribute(e, 'morningClosing', index)}
                    />
                  </OpenCloseContainer>
                  <h3>Horaires en soirée</h3>
                  <OpenCloseContainer>
                    <ScheduleInput
                      daySchedule={daySchedule}
                      attribute="afternoonOpening"
                      updateScheduleAttribute={(
                        e: ChangeEvent<HTMLInputElement>
                      ) =>
                        updateScheduleAttribute(e, 'afternoonOpening', index)
                      }
                    />
                    <ScheduleInput
                      daySchedule={daySchedule}
                      attribute="afternoonClosing"
                      updateScheduleAttribute={(
                        e: ChangeEvent<HTMLInputElement>
                      ) =>
                        updateScheduleAttribute(e, 'afternoonClosing', index)
                      }
                    />
                  </OpenCloseContainer>
                </DayContainer>
              );
            })}
          </GridContainer>
          <SubmitStatusContainer>
            <Confirm
              type="submit"
              value="Confirmer"
              onClick={() => handleModifySchedule()}
            />
            <StatusMessage id="weekScheduleStatus">
              {statusMessage}
            </StatusMessage>
          </SubmitStatusContainer>
        </ScheduleForm>
      </ScheduleContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScheduleContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  min-height: fit-content;
`;

const ScheduleForm = styled.form`
  width: 90%;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  gap: 50px;
  padding: 40px 20px;
  border-radius: 24px;
`;

const DayContainer = styled.div<{ $isOdd: boolean }>`
  width: 35%;
  border: ${(props) =>
    `3px solid ${
      props.$isOdd ? props.theme.lightGreen : props.theme.darkGreen
    }`};
  padding: 40px 5%;
  border-radius: 24px;
  overflow: hidden;
`;

const DayHeader = styled.h2<{ $isOdd: boolean }>`
  background-color: ${(props) =>
    props.$isOdd ? props.theme.lightGreen : props.theme.darkGreen};
  color: ${(props) => (props.$isOdd ? props.theme.darkGrey : props.theme.snow)};
  padding: 10px 0px;
  border-radius: 48px;
`;
const OpenCloseContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
`;

const SubmitStatusContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Confirm = styled.input`
  background-color: ${(props) => props.theme.darkGreen};
  border: ${(props) => `1px solid ${props.theme.darkGrey}`};
  color: ${(props) => props.theme.snow};
  font-size: 28px;
  padding: 10px 10px;
  width: 160px;
  border-radius: 8px;
  cursor: pointer;
`;

const StatusMessage = styled.p``;

export default ScheduleDashboard;
