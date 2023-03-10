import SvgReservations from '@/components/svgs/reservations';
import { useState } from 'react';
import styled from 'styled-components';
import DashboardButton from '../DashboardButton';

const TheClients = ({}: {}) => {
  const [openedConfigPanel, setOpenedConfigPanel] = useState<string>('');

  return (
    <MenuContainer className="dashboardMenuOpening" id="menuLinksContainer">
      <DashboardButton
        title="Réservations"
        svg={<SvgReservations />}
        setOpenedConfigPanel={setOpenedConfigPanel}
      />
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  margin-top: -25px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  display: flex;
  justify-content: center;
  gap: 1%;
  padding-top: 50px;
  padding-bottom: 20px;
  border: ${(props) => `3px solid ${props.theme.darkBlue}`};
  border-top: 0px;
  overflow: hidden;
`;

export default TheClients;
