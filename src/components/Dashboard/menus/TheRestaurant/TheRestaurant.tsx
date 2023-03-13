import SvgLesHoraires from '@/components/svgs/lesHoraires';
import SvgNumberClients from '@/components/svgs/numberClients';
import { useState } from 'react';
import styled from 'styled-components';
import DashboardButton from '../DashboardButton';
import SeatsNumberDashboard from './SeatsNumber/SeatsNumberDashboard';

const TheRestaurant = ({}: {}) => {
  const [openedConfigPanel, setOpenedConfigPanel] = useState<string>('');

  const displayOpenedConfigPanel = () => {
    switch (openedConfigPanel) {
      case 'Les Horaires':
        return <></>;
      case "Capacité d'accueil":
        return <SeatsNumberDashboard />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <PanelContainer
        className="dashboardMenuOpening"
        id="restaurantLinksContainer"
        $openedConfigPanel={openedConfigPanel}
      >
        <MenuContainer>
          <DashboardButton
            title="Les Horaires"
            svg={<SvgLesHoraires />}
            setOpenedConfigPanel={setOpenedConfigPanel}
          />
          <DashboardButton
            title="Capacité d'accueil"
            svg={<SvgNumberClients />}
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

export default TheRestaurant;
