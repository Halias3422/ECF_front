import SvgReservations from '@/components/svgs/reservations';
import { useState } from 'react';
import styled from 'styled-components';
import DashboardButton from '../DashboardButton';
import ReservationsDashboard from './Reservations/ReservationsDashboard';

const TheClients = ({}: {}) => {
  const [openedConfigPanel, setOpenedConfigPanel] = useState<string>('');

  const displayOpenedConfigPanel = () => {
    switch (openedConfigPanel) {
      case 'Réservations':
        return <ReservationsDashboard />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <PanelContainer
        className="dashboardMenuOpening"
        id="ClientsLinksContainer"
        $openedConfigPanel={openedConfigPanel}
      >
        <MenuContainer>
          <DashboardButton
            title="Réservations"
            svg={<SvgReservations />}
            setOpenedConfigPanel={setOpenedConfigPanel}
          />
        </MenuContainer>
      </PanelContainer>
      {displayOpenedConfigPanel()}
    </>
  );
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3%;
`;
const PanelContainer = styled.div<{ $openedConfigPanel: string }>`
  margin-top: -25px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-top: 50px;
  padding-bottom: 20px;
  gap: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  ${(props) =>
    props.$openedConfigPanel.length > 0 &&
    `border-bottom: none; border-radius: 0px;`}
  border-top: 0px;
  overflow: hidden;
`;

export default TheClients;
